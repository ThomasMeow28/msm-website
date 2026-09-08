class NetworkConfiguration
  def initialize(environment = ENV)
    @environment = environment
  end

  def apply(app)
    app.set :bind, "0.0.0.0"
    app.set :port, environment.fetch("PORT", 4567).to_i
    app.set :allowed_origin, environment.fetch("CLIENT_ORIGIN", "")
    app.set :cors_headers, cors_headers
  end

  private

  attr_reader :environment

  def cors_headers
    {
      "Access-Control-Allow-Origin" => environment.fetch("CLIENT_ORIGIN", ""),
      "Access-Control-Allow-Headers" => "Content-Type",
      "Access-Control-Allow-Methods" => "GET, POST, OPTIONS",
      "Access-Control-Allow-Credentials" => "true",
    }
  end
end