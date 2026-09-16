require "json"
require "net/http"
require "stringio"
require "uri"
require "googleauth"

class ResourceProxy
  DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.readonly".freeze

  def self.list_files
    id = ENV["GOOGLE_DRIVE_RESOURCES_FOLDER_ID"].to_s.strip
    raise "GOOGLE_DRIVE_RESOURCES_FOLDER_ID is required" if id.empty?

    uri = URI("https://www.googleapis.com/drive/v3/files")
    uri.query = URI.encode_www_form(
      q: "'#{id}' in parents and trashed = false and mimeType != 'application/vnd.google-apps.folder'",
      orderBy: "name",
      includeItemsFromAllDrives: "true",
      supportsAllDrives: "true",
      fields: "files(id,name,mimeType,size,modifiedTime,webViewLink)",
    )

    response = drive_request(uri)
    raise "Google Drive API returned #{response.code}" unless response.is_a?(Net::HTTPSuccess)

    JSON.parse(response.body).fetch("files", []).map do |file|
      {
        id: file["id"],
        name: file["name"],
        mimeType: file["mimeType"],
        size: file["size"].to_i,
        modifiedTime: file["modifiedTime"],
        webViewLink: file["webViewLink"],
      }
    end
  end

  def self.fetch(file_id)
    metadata = file_metadata(file_id)
    response = drive_media_response(file_id)
    raise "Google Drive API returned #{response.code}" unless response.is_a?(Net::HTTPSuccess)

    {
      body: response.body,
      content_type: response["content-type"]&.split(";")&.first || "application/octet-stream",
      filename: sanitize_filename(metadata["name"] || file_id),
    }
  end

  def self.google_service_account_json
    json = ENV["GOOGLE_SERVICE_ACCOUNT_JSON"].to_s.strip
    return JSON.parse(json) unless json.empty?

    path = ENV["GOOGLE_SERVICE_ACCOUNT_KEY_PATH"].to_s.strip
    raise "GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_KEY_PATH is required" if path.empty?

    JSON.parse(File.read(path))
  end

  def self.google_access_token
    credentials = Google::Auth::ServiceAccountCredentials.make_creds(
      json_key_io: StringIO.new(JSON.generate(google_service_account_json)),
      scope: DRIVE_SCOPE,
    )
    credentials.fetch_access_token!
    credentials.access_token
  end

  def self.file_metadata(file_id)
    uri = URI("https://www.googleapis.com/drive/v3/files/#{file_id}")
    uri.query = URI.encode_www_form(
      fields: "name,mimeType",
      supportsAllDrives: "true",
    )

    response = drive_request(uri)
    raise "Google Drive API returned #{response.code}" unless response.is_a?(Net::HTTPSuccess)

    JSON.parse(response.body)
  end

  def self.drive_media_response(file_id)
    uri = URI("https://www.googleapis.com/drive/v3/files/#{file_id}?alt=media&supportsAllDrives=true")
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "Bearer #{google_access_token}"

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.open_timeout = 10
    http.read_timeout = 60
    http.request(request)
  end

  def self.drive_request(uri)
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "Bearer #{google_access_token}"

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.open_timeout = 10
    http.read_timeout = 60
    http.request(request)
  end

  def self.sanitize_filename(name)
    cleaned = name.to_s.gsub(/[\\\/:*?"<>|\r\n]+/, " ").strip
    cleaned.empty? ? "download" : cleaned
  end

  private_class_method :google_service_account_json, :google_access_token, :drive_media_response, :drive_request, :file_metadata, :sanitize_filename
end