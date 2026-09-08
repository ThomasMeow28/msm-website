require "securerandom"

class SecurityConfiguration
  def initialize(environment = ENV)
    @environment = environment
  end

  def apply(app)
    app.set :session_secret, session_secret
    app.enable :sessions
    app.set :sessions, session_options
  end

  def session_secret
    @session_secret ||= if environment["RACK_ENV"] == "production"
      environment.fetch("SESSION_SECRET")
    else
      environment.fetch("SESSION_SECRET") { SecureRandom.hex(64) }
    end
  end

  private

  attr_reader :environment

  def session_options
    {
      key: "msm.session",
      httponly: true,
      same_site: :lax,
      secure: environment["RACK_ENV"] == "production",
    }
  end
end