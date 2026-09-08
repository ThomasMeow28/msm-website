require "json"
require "net/smtp"
require "pg"

module Routes
  module Authentication
    def self.registered(app)
      app.post "/api/signup" do
        body = request_json
        name = body.fetch("name", "").strip
        email = body.fetch("email", "").strip.downcase
        password = body.fetch("password", "")
        date_of_birth = body.fetch("dateOfBirth", "")
        errors, parsed_date = SignupValidator.call(name: name, email: email, password: password, date_of_birth: date_of_birth)
        return json_response({ error: "validation_failed", fields: errors }, 422) unless errors.empty?

        settings.accounts.signup(name: name, email: email, password: password, date_of_birth: parsed_date)
        json_response({ email: email, message: "Check your email for a verification code" }, 201)
      rescue JSON::ParserError
        json_response({ error: "invalid_json", message: "Request body must include name, email, password, and dateOfBirth" }, 400)
      rescue PG::UniqueViolation
        json_response({ error: "email_taken", message: "An account with that email already exists" }, 409)
      rescue KeyError => error
        return json_response({ error: "email_unavailable", message: "Email delivery is not configured" }, 503) if error.key.to_s.start_with?("SMTP_")
        json_response({ error: "invalid_json", message: "Request body must include name, email, password, and dateOfBirth" }, 400)
      rescue Net::SMTPError, SocketError => error
        warn "SMTP delivery failed (#{error.class}): #{error.message}"
        json_response({ error: "email_unavailable", message: "Unable to send the verification email" }, 503)
      rescue PG::Error
        json_response({ error: "database_unavailable", message: "Unable to create the account right now" }, 503)
      end

      app.post "/api/verify-email" do
        body = request_json
        user = settings.accounts.verify_email(email: body.fetch("email", "").strip.downcase, code: body.fetch("code", "").strip)
        return json_response({ error: "invalid_verification_code", message: "The verification code is invalid or expired" }, 422) unless user

        session[:user_id] = user["id"].to_i
        json_response(user_response(user).merge(message: "Email verified. You are now logged in."))
      rescue JSON::ParserError, KeyError
        json_response({ error: "invalid_json", message: "Request body must include email and code" }, 400)
      rescue PG::Error
        json_response({ error: "database_unavailable", message: "Unable to verify the email right now" }, 503)
      end

      app.post "/api/login" do
        body = request_json
        result, user = settings.accounts.authenticate_password(email: body.fetch("email", "").strip.downcase, password: body.fetch("password", ""))
        return json_response({ error: "email_not_verified", message: "Please verify your email before logging in" }, 403) if result == :not_verified
        return json_response({ error: "invalid_credentials", message: "Email or password is incorrect" }, 401) unless result == :authenticated

        session[:user_id] = user["id"].to_i
        json_response(user_response(user))
      rescue JSON::ParserError, KeyError
        json_response({ error: "invalid_json", message: "Request body must include email and password" }, 400)
      rescue PG::Error
        json_response({ error: "database_unavailable", message: "Unable to log in right now" }, 503)
      end

      app.post "/api/request-login-code" do
        email = request_json.fetch("email", "").strip.downcase
        settings.accounts.request_login_code(email: email)
        json_response({ message: "If that email belongs to a verified account, a login code has been sent" })
      rescue JSON::ParserError, KeyError
        json_response({ error: "invalid_json", message: "Request body must include email" }, 400)
      rescue Net::SMTPError, SocketError => error
        warn "SMTP delivery failed (#{error.class}): #{error.message}"
        json_response({ error: "email_unavailable", message: "Unable to send the login code" }, 503)
      rescue PG::Error
        json_response({ error: "database_unavailable", message: "Unable to send a login code right now" }, 503)
      end

      app.post "/api/login-with-code" do
        body = request_json
        user = settings.accounts.login_with_code(email: body.fetch("email", "").strip.downcase, code: body.fetch("code", "").strip)
        return json_response({ error: "invalid_login_code", message: "The login code is invalid or expired" }, 401) unless user

        session[:user_id] = user["id"].to_i
        json_response(user_response(user))
      rescue JSON::ParserError, KeyError
        json_response({ error: "invalid_json", message: "Request body must include email and code" }, 400)
      rescue PG::Error
        json_response({ error: "database_unavailable", message: "Unable to log in right now" }, 503)
      end

      app.get "/api/session" do
        return json_response({ authenticated: false }) unless session[:user_id]

        user = settings.users.find_by_id(session[:user_id])
        unless user
          session.clear
          return json_response({ authenticated: false })
        end
        json_response({ authenticated: true }.merge(user_response(user)))
      rescue PG::Error
        json_response({ error: "database_unavailable", message: "Unable to check the session right now" }, 503)
      end

      app.post "/api/logout" do
        session.clear
        json_response({ authenticated: false })
      end
    end
  end
end
