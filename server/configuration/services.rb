require "securerandom"

class ServiceConfiguration
  def initialize(environment = ENV, session_secret: nil)
    @environment = environment
    @session_secret = session_secret
  end

  def apply(app)
    app.set :database, database
    app.set :users, users
    app.set :accounts, accounts
  end

  private

  attr_reader :environment

  def database
    @database ||= Database.new(environment.fetch("DATABASE_URL", ""))
  end

  def users
    @users ||= UserRepository.new(database)
  end

  def accounts
    @accounts ||= AccountService.new(
      users: users,
      email_sender: EmailSender.new,
      session_secret: session_secret,
    )
  end

  def session_secret
    @session_secret ||= environment.fetch("SESSION_SECRET") { SecureRandom.hex(64) }
  end
end