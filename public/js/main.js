( function( window, angular ) {
    angular
        .module( 'app', [ 'visualCaptcha' ] )
        .controller( 'captchaController', function( $scope ) {
            $scope.captchaOptions = {
                imgPath: 'img/',
                captcha: {
                    numberOfImages: 5,
                    callbacks: {
                        loaded: function( captcha ) {
                            // Binds an element to callback on click
                            // @param element object like document.getElementById() (has to be a single element)
                            // @param callback function to run when the element is clicked
                            var _bindClick = function( element, callback ) {
                                if ( element.addEventListener ) {
                                    element.addEventListener( 'click', callback, false );
                                } else {
                                    element.attachEvent( 'onclick', callback );
                                }
                            };

                            // Avoid adding the hashtag to the URL when clicking/selecting visualCaptcha options
                            var anchorOptions = document.getElementById( 'sample-captcha' ).getElementsByTagName( 'a' );
                            var anchorList = Array.prototype.slice.call( anchorOptions );// .getElementsByTagName does not return an actual array
                            anchorList.forEach( function( anchorItem ) {
                                _bindClick( anchorItem, function( event ) {
                                    event.preventDefault();
                                });
                            });
                        }
                    }

                },
                init: function ( captcha ) {
                    $scope.captcha = captcha;
                }
            };

            $scope.isVisualCaptchaFilled = function() {
                if ( $scope.captcha.getCaptchaData().valid ) {
                    window.alert( 'visualCaptcha is filled!' );
                } else {
                    window.alert( 'visualCaptcha is NOT filled!' );
                }
            };


            var queryString = window.location.search;
            // Show success/error messages
            $scope.status = null;
            if ( queryString.indexOf('status=noCaptcha') !== -1 ) {
                $scope.valid = false;
                $scope.status = 'visualCaptcha was not started!';
            } else if ( queryString.indexOf('status=validImage') !== -1 ) {
                $scope.valid = true;
                $scope.status = 'Image was valid!';
            } else if ( queryString.indexOf('status=failedImage') !== -1 ) {
                $scope.valid = false;
                $scope.status = 'Image was NOT valid!';
            } else if ( queryString.indexOf('status=validAudio') !== -1 ) {
                $scope.valid = true;
                $scope.status = 'Accessibility answer was valid!';
            } else if ( queryString.indexOf('status=failedAudio') !== -1 ) {
                $scope.valid = false;
                $scope.status = 'Accessibility answer was NOT valid!';
            } else if ( queryString.indexOf('status=failedPost') !== -1 ) {
                $scope.valid = false;
                $scope.status = 'No visualCaptcha answer was given!';
            }
        } );
}( window, angular ) );