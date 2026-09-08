require "dotenv/load"
require "sinatra/base"

require_relative "services/database"
require_relative "services/email_sender"
require_relative "services/account_service"
require_relative "repositories/user_repository"
require_relative "validators/signup_validator"
require_relative "helpers/http_helpers"
require_relative "configuration"
require_relative "routes/health"
require_relative "routes/authentication"

class MsmApi < Sinatra::Base
  configure do
    ServerConfiguration.new.apply(self)
  end

  helpers HttpHelpers

  before do
    settings.cors_headers.each do |header, value|
      response.headers[header] = value
    end
  end

  options "/api/*" do
    status 204
  end

  register Routes::Health
  register Routes::Authentication
end
