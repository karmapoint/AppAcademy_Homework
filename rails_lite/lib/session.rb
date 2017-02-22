require 'json'

class Session
  # find the cookie for this app
  # deserialize the cookie into a hash
  def initialize(req)
    existing_info = req.cookies["_rails_lite_app"]
    if existing_info
      @session = JSON.parse(existing_info)
    else
      @session = {}
    end
  end

  def [](key)
    @session[key]
  end

  def []=(key, val)
    @session[key] = val
  end

  # serialize the hash into json and save in a cookie
  # add to the responses cookies
  def store_session(res)
    serialized_data = @session.to_json
    path = "/"
    cookie_data = {path: path, value: serialized_data}
    res.set_cookie("_rails_lite_app", cookie_data)
  end
end
