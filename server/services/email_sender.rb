require "json"
require "net/http"
require "net/smtp"
require "uri"

# Sends the six-digit codes.
#
# Two transports. Resend's HTTP API is used when RESEND_API_KEY is set, and is
# the right choice on Render: Render blocks outbound SMTP ports (25/465/587),
# so Net::SMTP connections there fail with Net::OpenTimeout. Plain HTTPS is
# unaffected.
#
# The SMTP path is kept for local development and for hosts that permit it.
class EmailSender
  RESEND_ENDPOINT = URI("https://api.resend.com/emails").freeze

  # Net::SMTPError is a module, not a class, so it cannot be raised directly.
  # Including it means the routes' existing `rescue Net::SMTPError` catches
  # HTTP delivery failures too, with no change needed there.
  class DeliveryError < StandardError
    include Net::SMTPError
  end

  def send_verification(email, code)
    send_code(
      email,
      code,
      subject: "Verify your Mathematical Society of Myanmar account",
      message_intro: "Your Mathematical Society of Myanmar verification code is",
    )
  end

  def send_login_code(email, code)
    send_code(
      email,
      code,
      subject: "Your Mathematical Society of Myanmar login code",
      message_intro: "Your Mathematical Society of Myanmar login code is",
    )
  end

  private

  def send_code(email, code, subject:, message_intro:)
    body = <<~BODY
      #{message_intro}: #{code}

      This code expires in 15 minutes. If you did not request, you can ignore this email.
    BODY

    if ENV["RESEND_API_KEY"].to_s.empty?
      deliver_over_smtp(email, subject: subject, body: body)
    else
      deliver_over_resend(email, subject: subject, body: body)
    end
  end

  def deliver_over_resend(email, subject:, body:)
    request = Net::HTTP::Post.new(RESEND_ENDPOINT)
    request["Authorization"] = "Bearer #{ENV.fetch('RESEND_API_KEY')}"
    request["Content-Type"] = "application/json"
    request.body = JSON.generate(
      from: ENV.fetch("MAIL_FROM"),
      to: [email],
      subject: subject,
      text: body,
    )

    response = Net::HTTP.start(
      RESEND_ENDPOINT.host,
      RESEND_ENDPOINT.port,
      use_ssl: true,
      open_timeout: 10,
      read_timeout: 10,
    ) { |http| http.request(request) }

    return if response.is_a?(Net::HTTPSuccess)

    # Surfaced as 503 email_unavailable by the routes, same as an SMTP failure.
    raise DeliveryError, "Resend responded #{response.code}: #{response.body}"
  end

  def deliver_over_smtp(email, subject:, body:)
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

      #{body}
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
