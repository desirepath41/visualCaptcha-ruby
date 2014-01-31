( function( window, angular ) {
    angular
        .module( 'app', [ 'visualCaptcha' ] )
        .controller( 'captchaController', function( $scope ) {
            $scope.captchaOptions = {
                imgPath: '/img/',
                captcha: {
                    url: window.location.protocol.origin,
                    numberOfImages: 5
                },
                init: function ( captcha ) {
                    $scope.captcha = captcha;
                }
            };

            $scope.alertCaptchaData = function() {
                if ( $scope.captcha ) {
                    alert( JSON.stringify( $scope.captcha.getCaptchaData(), null, '\t' ) );
                } else {
                    alert( 'Captcha not set' );
                }
            }
        } );
}( window, angular ) );