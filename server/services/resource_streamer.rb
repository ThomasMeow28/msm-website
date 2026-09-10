require "net/http"
require "uri"

class ResourceStreamer
  MAX_REDIRECTS = 5

  def initialize(resources)
    @resources = resources
  end

  def stream(resource_id)
    source = @resources.fetch(resource_id)
    uri = URI(source)

    Enumerator.new do |chunks|
      request(uri, 0) do |response|
        raise "Resource upstream returned #{response.code}" unless response.is_a?(Net::HTTPSuccess)

        response.read_body { |chunk| chunks << chunk }
      end
    end
  rescue KeyError
    nil
  end

  private

  def request(uri, redirects)
    raise "Too many upstream redirects" if redirects >= MAX_REDIRECTS

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = uri.scheme == "https"
    http.open_timeout = 10
    http.read_timeout = 60

    request = Net::HTTP::Get.new(uri)
    request["User-Agent"] = "MSM resource server"
    http.start do
      http.request(request) do |response|
        if response.is_a?(Net::HTTPRedirection)
          location = response["location"]
          raise "Upstream redirect has no location" unless location

          request(URI.join(uri.to_s, location), redirects + 1) { |redirected| yield redirected }
        else
          yield response
        end
      end
    end
  end
end