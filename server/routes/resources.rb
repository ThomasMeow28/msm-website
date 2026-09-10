require_relative "../services/resource_streamer"

module Routes
  module Resources
    RESOURCE_SOURCES = {
      "past-papers-grade-9" => "https://drive.usercontent.google.com/download?id=1F_c1f2paVaNRZCiCEWNKibk2CdRboM5_&export=download&confirm=t",
      "past-papers-grade-10" => "https://drive.usercontent.google.com/download?id=1LiMU5ybP_5IeCTVBzX73xIwhiguPCjmS&export=download&confirm=t",
      "past-papers-grade-11" => "https://drive.usercontent.google.com/download?id=1_OFltQsF0ebfVm8n5UmNF_AynOXN5N_b&export=download&confirm=t",
      "past-papers-junior-1" => "https://drive.usercontent.google.com/download?id=1Nlf2-27Bp-2iOZ1Un0a4a-UlehaNt_y-&export=download&confirm=t",
      "past-papers-junior-2" => "https://drive.usercontent.google.com/download?id=1XWZQ3Om7xa-os0jBfkwvTIl2pdKhKKvv&export=download&confirm=t",
      "past-papers-senior-1" => "https://drive.usercontent.google.com/download?id=1_og7GUMj74rmaWJ8y75BoF7fg1mfnK1F&export=download&confirm=t",
      "past-papers-senior-2" => "https://drive.usercontent.google.com/download?id=1GTFXlX8ir2XZak0jxxYyrB34GPL76A38&export=download&confirm=t",
      "past-papers-team-selection" => "https://drive.usercontent.google.com/download?id=1mRhZIj1YBJYZ0ucMQwtVZ-RuiKM6fAFl&export=download&confirm=t",
      "books-junior-1" => "https://drive.usercontent.google.com/download?id=1hy-PV0pMyB7ceV24WVukva_oVN56R211&export=download&confirm=t",
      "books-junior-2" => "https://drive.usercontent.google.com/download?id=1P0cps9YRuk3JVxoqF-MQOXGaWsahZkMS&export=download&confirm=t",
      "books-mmo" => "https://drive.usercontent.google.com/download?id=10lxibT9xn3kXsE38YVC_HDpkXUlTm-rn&export=download&confirm=t",
    }.freeze

    def self.registered(app)
      app.set :resource_streamer, ResourceStreamer.new(RESOURCE_SOURCES)

      app.get "/api/resources/:resource_id" do
        resource_id = params.fetch("resource_id")
        stream = settings.resource_streamer.stream(resource_id)
        halt 404 unless stream

        response.headers["Content-Type"] = "application/octet-stream"
        response.headers["Content-Disposition"] = "attachment; filename=#{resource_id}.pdf"
        response.body = stream
        response.finish
      rescue StandardError
        halt 502
      end
    end
  end
end