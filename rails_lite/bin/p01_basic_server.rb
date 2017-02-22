require 'rack'

app = Proc.new do |env|
  req = Rack::Request.new(env)
  res = Rack::Response.new
  res['Content-Type'] = 'text/html'
  path = req.fullpath
  message = path.split("/").join(" ")
  content_type = req.content_type
  # res.write(message)
  res.write(content_type)
  res.finish
end


Rack::Server.start(
  app: app,
  Port: 3000
)
