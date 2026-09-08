require "bcrypt"
require "digest"
require "securerandom"

class AccountService
  def initialize(users:, email_sender:, session_secret:)
    @users = users
    @email_sender = email_sender
    @session_secret = session_secret
  end

  def signup(name:, email:, password:, date_of_birth:)
    code = verification_code
    @users.create(
      name: name,
      email: email,
      password_digest: BCrypt::Password.create(password),
      date_of_birth: date_of_birth,
      verification_code_digest: digest(code),
    ) { @email_sender.send_verification(email, code) }
  end

  def verify_email(email:, code:)
    @users.verify_email(email: email, verification_code_digest: digest(code))
  end

  def authenticate_password(email:, password:)
    user = @users.find_for_password(email)
    return [:not_verified, user] if user && user["verified_at"].nil?
    authenticated = user && BCrypt::Password.new(user["password_digest"]) == password
    [authenticated ? :authenticated : :invalid, user]
  end

  def request_login_code(email:)
    code = verification_code
    user = @users.set_login_code(email: email, verification_code_digest: digest(code))
    @email_sender.send_login_code(email, code) if user
  end

  def login_with_code(email:, code:)
    @users.consume_login_code(email: email, verification_code_digest: digest(code))
  end

  private

  def verification_code
    format("%06d", SecureRandom.random_number(1_000_000))
  end

  def digest(code)
    Digest::SHA256.hexdigest("#{@session_secret}:#{code}")
  end
end
