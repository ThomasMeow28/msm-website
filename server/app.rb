require "dotenv/load"
require "sinatra/base"
require "json"
require "bcrypt"
require "date"
require "pg"
require "securerandom"
require "digest"
require "net/smtp"

class MsmApi < Sinatra::Base
  configure do
    set :bind, "0.0.0.0"
    set :port, ENV.fetch("PORT", 4567).to_i
    set :database_url, ENV.fetch("DATABASE_URL", "")
    set :allowed_origin, ENV.fetch("CLIENT_ORIGIN", "")
    set :session_secret, ENV.fetch("SESSION_SECRET") { SecureRandom.hex(64) }
    enable :sessions
    set :sessions, {
      key: "msm.session",
      httponly: true,
      same_site: :lax,
      secure: ENV["RACK_ENV"] == "production",
    }
  end

  before do
    response.headers["Access-Control-Allow-Origin"] = settings.allowed_origin
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Credentials"] = "true"
  end

  options "/api/*" do
    status 204
  end

  helpers do
    def database
      PG.connect(settings.database_url)
    end

    def json_response(payload, response_status = 200)
      content_type :json
      status response_status
      payload.to_json
    end

    def verification_code_digest(code)
      Digest::SHA256.hexdigest("#{settings.session_secret}:#{code}")
    end

    def send_verification_email(email, code, subject: "Verify your Mathematical Society of Myanmar account", message_intro: "Your Mathematical Society of Myanmar verification code is")
      smtp_address = ENV.fetch("SMTP_ADDRESS")
      smtp_port = ENV.fetch("SMTP_PORT", "587").to_i
      smtp_domain = ENV.fetch("SMTP_DOMAIN", smtp_address)
      from = ENV.fetch("SMTP_FROM")
      message = <<~MESSAGE
        From: #{from}
        To: #{email}
        Subject: #{subject}
        MIME-Version: 1.0
        Content-Type: text/plain; charset=UTF-8

        #{message_intro}: #{code}

        This code expires in 15 minutes. If you did not request, you can ignore this email.
      MESSAGE

      smtp = Net::SMTP.new(smtp_address, smtp_port)
      smtp.open_timeout = 10
      smtp.read_timeout = 10
      smtp.enable_starttls_auto if ENV.fetch("SMTP_STARTTLS", "true") == "true"
      smtp.start(smtp_domain, ENV["SMTP_USERNAME"], ENV["SMTP_PASSWORD"], :plain) do |connection|
        connection.send_message(message, from, email)
      end
    end
  end

  get "/health" do
    connection = database
    connection.exec("SELECT 1")
    connection.close
    json_response(status: "ok", database: "connected")
  rescue PG::Error
    json_response({ status: "error", database: "unavailable" }, 503)
  end

  post "/api/signup" do
    request_body = JSON.parse(request.body.read)
    email = request_body.fetch("email", "").strip.downcase
    password = request_body.fetch("password", "")
    date_of_birth = request_body.fetch("dateOfBirth", "")

    begin
      parsed_date = Date.iso8601(date_of_birth)
    rescue Date::Error
      parsed_date = nil
    end

    errors = {}
    errors["email"] = "Enter a valid email address" unless email.match?(/\A[^\s@]+@[^\s@]+\.[^\s@]+\z/)
    errors["password"] = "Password must be at least 8 characters" if password.length < 8
    errors["dateOfBirth"] = "Enter a valid date of birth" if parsed_date.nil? || parsed_date > Date.today

    return json_response({ error: "validation_failed", fields: errors }, 422) unless errors.empty?

    code = format("%06d", SecureRandom.random_number(1_000_000))
    connection = database
    connection.transaction do |transaction|
      transaction.exec_params(
        "INSERT INTO users (email, password_digest, date_of_birth, verification_code_digest, verification_expires_at, verified_at) VALUES ($1, $2, $3, $4, NOW() + INTERVAL '15 minutes', NULL)",
        [email, BCrypt::Password.create(password), parsed_date, verification_code_digest(code)],
      )
      send_verification_email(email, code)
    end
    connection.close

    json_response({ email: email, message: "Check your email for a verification code" }, 201)
  rescue JSON::ParserError
    json_response({ error: "invalid_json", message: "Request body must include email, password, and dateOfBirth" }, 400)
  rescue PG::UniqueViolation
    connection&.close
    json_response({ error: "email_taken", message: "An account with that email already exists" }, 409)
  rescue KeyError => error
    connection&.close
    if error.key.to_s.start_with?("SMTP_")
      json_response({ error: "email_unavailable", message: "Email delivery is not configured" }, 503)
    else
      json_response({ error: "invalid_json", message: "Request body must include email, password, and dateOfBirth" }, 400)
    end
  rescue Net::SMTPError, SocketError => error
    connection&.close
    warn "SMTP delivery failed (#{error.class}): #{error.message}"
    json_response({ error: "email_unavailable", message: "Unable to send the verification email" }, 503)
  rescue PG::Error
    connection&.close
    json_response({ error: "database_unavailable", message: "Unable to create the account right now" }, 503)
  end

  post "/api/verify-email" do
    request_body = JSON.parse(request.body.read)
    email = request_body.fetch("email", "").strip.downcase
    code = request_body.fetch("code", "").strip
    connection = database
    result = connection.exec_params(
      "UPDATE users SET verified_at = NOW(), verification_code_digest = NULL, verification_expires_at = NULL WHERE LOWER(email) = $1 AND verified_at IS NULL AND verification_code_digest = $2 AND verification_expires_at > NOW() RETURNING email",
      [email, verification_code_digest(code)],
    )
    connection.close

    return json_response({ error: "invalid_verification_code", message: "The verification code is invalid or expired" }, 422) if result.ntuples.zero?

    json_response({ email: result[0]["email"], message: "Email verified. You can now log in." })
  rescue JSON::ParserError, KeyError
    json_response({ error: "invalid_json", message: "Request body must include email and code" }, 400)
  rescue PG::Error
    connection&.close
    json_response({ error: "database_unavailable", message: "Unable to verify the email right now" }, 503)
  end

  post "/api/login" do
    request_body = JSON.parse(request.body.read)
    email = request_body.fetch("email", "").strip.downcase
    password = request_body.fetch("password", "")

    connection = database
    result = connection.exec_params(
      "SELECT id, email, password_digest, verified_at FROM users WHERE LOWER(email) = $1 LIMIT 1",
      [email],
    )
    connection.close

    user = result.ntuples.zero? ? nil : result[0]
    return json_response({ error: "email_not_verified", message: "Please verify your email before logging in" }, 403) if user && user["verified_at"].nil?
    authenticated = user ? BCrypt::Password.new(user["password_digest"]) == password : false
    return json_response({ error: "invalid_credentials", message: "Email or password is incorrect" }, 401) unless authenticated

    session[:user_id] = user["id"].to_i
    json_response({ user: { id: user["id"].to_i, email: user["email"] } })
  rescue JSON::ParserError, KeyError
    json_response({ error: "invalid_json", message: "Request body must include email and password" }, 400)
  rescue PG::Error
    connection&.close
    json_response({ error: "database_unavailable", message: "Unable to log in right now" }, 503)
  end

  post "/api/request-login-code" do
    request_body = JSON.parse(request.body.read)
    email = request_body.fetch("email", "").strip.downcase
    code = format("%06d", SecureRandom.random_number(1_000_000))
    connection = database
    result = connection.exec_params("SELECT id FROM users WHERE LOWER(email) = $1 AND verified_at IS NOT NULL LIMIT 1", [email])
    if result.ntuples.positive?
      connection.exec_params(
        "UPDATE users SET verification_code_digest = $1, verification_expires_at = NOW() + INTERVAL '15 minutes' WHERE id = $2",
        [verification_code_digest(code), result[0]["id"]],
      )
      send_verification_email(email, code, subject: "Your Mathematical Society of Myanmar login code", message_intro: "Your Mathematical Society of Myanmar login code is")
    end
    connection.close

    json_response({ message: "If that email belongs to a verified account, a login code has been sent" })
  rescue JSON::ParserError, KeyError
    json_response({ error: "invalid_json", message: "Request body must include email" }, 400)
  rescue Net::SMTPError, SocketError => error
    connection&.close
    warn "SMTP delivery failed (#{error.class}): #{error.message}"
    json_response({ error: "email_unavailable", message: "Unable to send the login code" }, 503)
  rescue PG::Error
    connection&.close
    json_response({ error: "database_unavailable", message: "Unable to send a login code right now" }, 503)
  end

  post "/api/login-with-code" do
    request_body = JSON.parse(request.body.read)
    email = request_body.fetch("email", "").strip.downcase
    code = request_body.fetch("code", "").strip
    connection = database
    result = connection.exec_params(
      "UPDATE users SET verification_code_digest = NULL, verification_expires_at = NULL WHERE LOWER(email) = $1 AND verified_at IS NOT NULL AND verification_code_digest = $2 AND verification_expires_at > NOW() RETURNING id, email",
      [email, verification_code_digest(code)],
    )
    connection.close

    return json_response({ error: "invalid_login_code", message: "The login code is invalid or expired" }, 401) if result.ntuples.zero?

    session[:user_id] = result[0]["id"].to_i
    json_response({ user: { id: result[0]["id"].to_i, email: result[0]["email"] } })
  rescue JSON::ParserError, KeyError
    json_response({ error: "invalid_json", message: "Request body must include email and code" }, 400)
  rescue PG::Error
    connection&.close
    json_response({ error: "database_unavailable", message: "Unable to log in right now" }, 503)
  end

  get "/api/session" do
    user_id = session[:user_id]
    return json_response({ authenticated: false }) unless user_id

    connection = database
    result = connection.exec_params("SELECT id, email FROM users WHERE id = $1", [user_id])
    connection.close
    user = result.ntuples.zero? ? nil : result[0]

    unless user
      session.clear
      return json_response({ authenticated: false })
    end

    json_response({ authenticated: true, user: { id: user["id"].to_i, email: user["email"] } })
  rescue PG::Error
    connection&.close
    json_response({ error: "database_unavailable", message: "Unable to check the session right now" }, 503)
  end

  post "/api/logout" do
    session.clear
    json_response({ authenticated: false })
  end
end
