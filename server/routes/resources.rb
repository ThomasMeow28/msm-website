require_relative "../services/resource_proxy"

module Routes
  module Resources
    def self.registered(app)
      app.get "/api/resources" do
        begin
          json_response({ items: ResourceProxy.list_files })
        rescue StandardError => error
          warn "Resource list failed (#{error.class}): #{error.message}"
          json_response({ error: "resource_unavailable", message: "Unable to load resources right now" }, 502)
        end
      end

      app.get "/api/resources/download/:file_id" do
        begin
          resource = ResourceProxy.fetch(params[:file_id])
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