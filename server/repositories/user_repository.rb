class UserRepository
  def initialize(database)
    @database = database
  end

  def create(name:, email:, password_digest:, date_of_birth:, verification_code_digest:)
    @database.with_connection do |connection|
      connection.transaction do |transaction|
        transaction.exec_params(
          "INSERT INTO users (name, email, password_digest, date_of_birth, verification_code_digest, verification_expires_at, verified_at) VALUES ($1, $2, $3, $4, $5, NOW() + INTERVAL '15 minutes', NULL)",
          [name, email, password_digest, date_of_birth, verification_code_digest],
        )
        yield if block_given?
      end
    end
  end

  def verify_email(email:, verification_code_digest:)
    @database.with_connection do |connection|
      connection.exec_params(
        "UPDATE users SET verified_at = NOW(), verification_code_digest = NULL, verification_expires_at = NULL WHERE LOWER(email) = $1 AND verified_at IS NULL AND verification_code_digest = $2 AND verification_expires_at > NOW() RETURNING id, name, email",
        [email, verification_code_digest],
      ).first
    end
  end

  def find_for_password(email)
    @database.with_connection do |connection|
      connection.exec_params(
        "SELECT id, name, email, password_digest, verified_at FROM users WHERE LOWER(email) = $1 LIMIT 1",
        [email],
      ).first
    end
  end

  def set_login_code(email:, verification_code_digest:)
    @database.with_connection do |connection|
      connection.transaction do |transaction|
        user = transaction.exec_params("SELECT id FROM users WHERE LOWER(email) = $1 AND verified_at IS NOT NULL LIMIT 1", [email]).first
        if user
          transaction.exec_params(
            "UPDATE users SET verification_code_digest = $1, verification_expires_at = NOW() + INTERVAL '15 minutes' WHERE id = $2",
            [verification_code_digest, user["id"]],
          )
        end
        user
      end
    end
  end

  def consume_login_code(email:, verification_code_digest:)
    @database.with_connection do |connection|
      connection.exec_params(
        "UPDATE users SET verification_code_digest = NULL, verification_expires_at = NULL WHERE LOWER(email) = $1 AND verified_at IS NOT NULL AND verification_code_digest = $2 AND verification_expires_at > NOW() RETURNING id, name, email",
        [email, verification_code_digest],
      ).first
    end
  end

  def find_by_id(id)
    @database.with_connection do |connection|
      connection.exec_params("SELECT id, name, email FROM users WHERE id = $1", [id]).first
    end
  end

  def connected?
    @database.with_connection do |connection|
      connection.exec("SELECT 1")
      true
    end
  end
end
