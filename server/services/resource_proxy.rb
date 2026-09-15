require "net/http"
require "uri"

class ResourceProxy
  RESOURCE_IDS = {
    "grade-9-papers" => ["1F_c1f2paVaNRZCiCEWNKibk2CdRboM5_", "grade-9-papers.pdf"],
    "grade-10-papers" => ["1LiMU5ybP_5IeCTVBzX73xIwhiguPCjmS", "grade-10-papers.pdf"],
    "grade-11-papers" => ["1_OFltQsF0ebfVm8n5UmNF_AynOXN5N_b", "grade-11-papers.pdf"],
    "momc-junior-1" => ["1Nlf2-27Bp-2iOZ1Un0a4a-UlehaNt_y-", "momc-junior-1.pdf"],
    "momc-junior-2" => ["1XWZQ3Om7xa-os0jBfkwvTIl2pdKhKKvv", "momc-junior-2.pdf"],
    "momc-senior-1" => ["1_og7GUMj74rmaWJ8y75BoF7fg1mfnK1F", "momc-senior-1.pdf"],
    "momc-senior-2" => ["1GTFXlX8ir2XZak0jxxYyrB34GPL76A38", "momc-senior-2.pdf"],
    "team-selection-tests" => ["1mRhZIj1YBJYZ0ucMQwtVZ-RuiKM6fAFl", "team-selection-tests.pdf"],
    "momc-junior-i-booklet" => ["1hy-PV0pMyB7ceV24WVukva_oVN56R211", "momc-junior-i-booklet.pdf"],
    "momc-junior-ii-booklet" => ["1P0cps9YRuk3JVxoqF-MQOXGaWsahZkMS", "momc-junior-ii-booklet.pdf"],
    "mmo-questions-solutions" => ["10lxibT9xn3kXsE38YVC_HDpkXUlTm-rn", "mmo-questions-solutions.pdf"],
  }.freeze

  MAX_REDIRECTS = 3
  ALLOWED_HOST = /\A(?:drive\.google\.com|drive\.usercontent\.google\.com|.+\.googleusercontent\.com)\z/

  def self.fetch(slug)
    file_id, filename = RESOURCE_IDS.fetch(slug)
    response = fetch_response(URI("https://drive.google.com/uc?export=download&id=#{file_id}"), MAX_REDIRECTS)
    raise "resource upstream returned #{response.code}" unless response.is_a?(Net::HTTPSuccess)

    {
      body: response.body,
      content_type: response["content-type"]&.split(";")&.first || "application/octet-stream",
      filename: filename,
    }
  rescue KeyError
    nil
  end

  def self.fetch_response(uri, redirects_left)
    raise "resource redirect limit exceeded" if redirects_left.zero?
    raise "resource redirect host rejected" unless uri.host.match?(ALLOWED_HOST)

    response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https", open_timeout: 10, read_timeout: 60) do |http|
      http.request(Net::HTTP::Get.new(uri))
    end
    return fetch_response(URI(response["location"]), redirects_left - 1) if response.is_a?(Net::HTTPRedirection)

    response
  end

  private_class_method :fetch_response
end