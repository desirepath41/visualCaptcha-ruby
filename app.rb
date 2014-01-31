require 'bundler/setup'
require 'sinatra/base'
require 'sinatra/json'
require 'visual_captcha'

class App < Sinatra::Base
  set :sessions, true
  set :public_folder, 'public'

  before do
    @session = VisualCaptcha::Session.new session
    @headers = {
        'Access-Control-Allow-Origin' => '*'
    }
  end

  after do
    headers @headers
  end

  get '/' do
    send_file File.join( 'public', 'index.html' )
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

  post '/try' do
    captcha = VisualCaptcha::Captcha.new @session
    frontend_data = captcha.frontend_data()

    if frontend_data.nil?
      redirect_path = '/?status=noCaptcha'
    else
      # If an image field name was submitted, try to validate it
      if ( image_answer = params[ frontend_data[ 'imageFieldName' ] ] )
        if captcha.validate_image image_answer
          redirect_path = '/?status=validImage'
        else
          redirect_path = '/?status=failedImage'
        end
      elsif ( audio_answer = params[ frontend_data[ 'audioFieldName' ] ] )
        if captcha.validate_audio audio_answer.downcase
          redirect_path = '/?status=validAudio'
        else
          redirect_path = '/?status=failedAudio'
        end
      else
        redirect_path = '/?status=failedPost'
      end

      how_many = captcha.selected_images().length
      captcha.generate( how_many )
    end

    redirect redirect_path
  end

  run! if app_file == $0
end