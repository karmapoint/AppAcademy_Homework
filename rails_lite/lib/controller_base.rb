require 'active_support'
require 'active_support/core_ext'
require 'erb'
require_relative './session'
require 'active_support/inflector'

class ControllerBase
  attr_reader :req, :res, :params

  # Setup the controller
  def initialize(req, res)
    @req = req
    @res = res
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    @already_built_response
  end

  # Set the response status code and header
  def redirect_to(url)
    # set location field of response heeader
    res['Location'] = url
    # set response code to 302
    res.status = 302
    session.store_session(@res)
    raise if already_built_response?
    @already_built_response = true
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    # set content type
    res['Content-Type'] = content_type
    # write the content to the body of the response
    res.write(content)
    # check if previously built

    session.store_session(@res)
    raise if already_built_response?
    # mark already built to be true
    @already_built_response = true
  end



  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
    # user controller/template names to template files
    controller_name = self.class.to_s
    template_label = template_name.to_s

    # read  the information from the path and store as a ERB object,
    # using binding to pull out the variables,etc
    path_for_render =
      "views/#{controller_name.underscore}/#{template_label.underscore}.html.erb"
    template = ERB.new(File.read(path_for_render)).result(binding)

    # pass the result to #render_content with content-type text/html
    content_type = "text/html"
    render_content(template, content_type )
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(@req)
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
  end
end
