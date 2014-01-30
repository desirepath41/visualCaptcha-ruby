require 'bundler/setup'
require 'sinatra/base'
require 'sinatra/json'
require 'visual_captcha'

class App < Sinatra::Base
  set :sessions, true

  before do
    @session = VisualCaptcha::Session.new session
    @headers = {
        'Access-Control-Allow-Origin' => '*'
    }
  end

  after do
    headers @headers
  end

  get '/start/:how_many' do
    captcha = VisualCaptcha::Captcha.new @session
    captcha.generate params[:how_many]

    json captcha.frontend_data
  end

  get '/audio/?:type?' do
    type = params[:type]
    type = 'mp3' if type != 'ogg'

    captcha = VisualCaptcha::Captcha.new @session

    if (@body = captcha.stream_audio @headers, type)
      body @body
    else
      not_found
    end
  end

  get '/image/:index' do
    captcha = VisualCaptcha::Captcha.new @session

    if (@body = captcha.stream_image @headers, params[:index], params[:retina])
      body @body
    else
      not_found
    end
  end

  run! if app_file == $0
end