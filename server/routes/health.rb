require "pg"

module Routes
  module Health
    def self.registered(app)
      app.get "/health" do
        settings.users.connected?
        json_response(status: "ok", database: "connected")
      rescue PG::Error
        json_response({ status: "error", database: "unavailable" }, 503)
      end
    end
  end
end
