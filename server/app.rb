require "dotenv/load"
require "sinatra/base"
require "json"
require "bcrypt"
require "date"
require "pg"
require "securerandom"

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

    connection = database
    result = connection.exec_params(
      "INSERT INTO users (email, password_digest, date_of_birth) VALUES ($1, $2, $3) RETURNING email, date_of_birth, created_at",
      [email, BCrypt::Password.create(password), parsed_date],
    )
    connection.close

    json_response({ user: result[0].transform_keys(&:to_sym) }, 201)
  rescue JSON::ParserError, KeyError
    json_response({ error: "invalid_json", message: "Request body must include email, password, and dateOfBirth" }, 400)
  rescue PG::UniqueViolation
    connection&.close
    json_response({ error: "email_taken", message: "An account with that email already exists" }, 409)
  rescue PG::Error
    connection&.close
    json_response({ error: "database_unavailable", message: "Unable to create the account right now" }, 503)
  end

  post "/api/login" do
    request_body = JSON.parse(request.body.read)
    email = request_body.fetch("email", "").strip.downcase
    password = request_body.fetch("password", "")

    connection = database
    result = connection.exec_params(
      "SELECT id, email, password_digest FROM users WHERE LOWER(email) = $1 LIMIT 1",
      [email],
    )
    connection.close

    user = result.ntuples.zero? ? nil : result[0]
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
