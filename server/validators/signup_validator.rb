require "date"

class SignupValidator
  EMAIL_PATTERN = /\A[^\s@]+@[^\s@]+\.[^\s@]+\z/

  def self.call(name:, email:, password:, date_of_birth:)
    parsed_date = parse_date(date_of_birth)
    errors = {}
    errors["name"] = "Enter your name" if name.empty?
    errors["email"] = "Enter a valid email address" unless email.match?(EMAIL_PATTERN)
    errors["password"] = "Password must be at least 8 characters" if password.length < 8
    errors["dateOfBirth"] = "Enter a valid date of birth" if parsed_date.nil? || parsed_date > Date.today
    [errors, parsed_date]
  end

  def self.parse_date(value)
    Date.iso8601(value)
  rescue Date::Error
    nil
  end

  private_class_method :parse_date
end
