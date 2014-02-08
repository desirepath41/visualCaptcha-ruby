visualCaptcha-ruby [![Build Status](https://travis-ci.org/emotionLoop/visualCaptcha-ruby.png?branch=master)](https://travis-ci.org/emotionLoop/visualCaptcha-ruby)
==================

Ruby sample for visualCaptcha. [You can also see it live](http://ruby.demo.visualcaptcha.net).

This is  demo/sample Ruby app that uses the [visualCaptcha rubygem](https://github.com/emotionLoop/visualCaptcha-rubyGem) and the [visualCaptcha AngularJS bower package](https://github.com/emotionLoop/visualCaptcha-frontend-angular), as a proof-of-concept for how to integrate it with your Ruby project.


## Installation 

You need Ruby 1.9.3+ installed with Bundler, to then run:
```
bundle install
```


## Run server

To start the server on port 8282, run the following command:
```
rackup -p 8282
```


## API

visualCaptcha, since 5.0, uses an API for increased security and to become back-end-agnostic (that's why you can easily plug-in a Vanilla JS, AngularJS, or jQuery front-end without changing anything).

It expects the following routes to exist, which we've put in this sample, using Sinatra (just to make it easier).

You are expected to have these routes in your implementation, but you can change them in visualCaptcha's front-end config.

### GET `/start/:howmany`

This route will be the first route called by the front-end, which will generate and store session data.

Parameters:

- `howmany` is required, the number of images to generate.

### GET `/image/:index`

This route will be called for each image, to get it and show it, by index.

Parameters:

- `index` is required, the index of the image you want to get.

### GET `/audio(/:type)`

This route will be called for the audio file, to get it and play it, either the mp3 or ogg file.

Parameters:

- `type` is optional, the audio file format defaults to `mp3`, but can also be `ogg`.

### POST `/try` 

This is just a sample route, where we post the form to, and where the visualCaptcha validation takes place.


## License

MIT. Check the LICENSE file.
