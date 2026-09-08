require_relative "configuration/network"
require_relative "configuration/security"
require_relative "configuration/services"

class ServerConfiguration
  def initialize(environment = ENV)
    @environment = environment
  end

  def apply(app)
    NetworkConfiguration.new(environment).apply(app)
    security = SecurityConfiguration.new(environment)
    security.apply(app)
    ServiceConfiguration.new(environment, session_secret: security.session_secret).apply(app)
  end

  private

  attr_reader :environment
end