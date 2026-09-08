require "json"

module HttpHelpers
  def request_json
    JSON.parse(request.body.read)
  end

  def json_response(payload, response_status = 200)
    content_type :json
    status response_status
    payload.to_json
  end

  def user_response(user)
    { user: { id: user["id"].to_i, name: user["name"], email: user["email"] } }
  end
end
