require "net/smtp"

class EmailSender
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
