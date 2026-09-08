require "pg"

class Database
  def initialize(database_url)
    @database_url = database_url
  end

  def with_connection
    connection = PG.connect(@database_url)
    yield connection
  ensure
    connection&.close
  end
end
