require_relative "../services/resource_proxy"

module Routes
  module Resources
    def self.registered(app)
      app.get "/api/resources/:slug" do
        begin
          resource = ResourceProxy.fetch(params[:slug])
        rescue StandardError => error
          warn "Resource download failed (#{error.class}): #{error.message}"
          halt 502, "Unable to download this resource right now"
        end

        halt 404 unless resource

        content_type resource[:content_type]
        headers["Content-Disposition"] = %(attachment; filename="#{resource[:filename]}")
        headers["Cache-Control"] = "public, max-age=3600"
        resource[:body]
      end
    end
  end
end