( function( angular ) {
    angular
        .module( 'app', [ 'visualCaptcha' ] )
        .controller( 'captchaController', function( $scope ) {
            $scope.captchaOptions = {
                imgPath: '/img/',
                captcha: {
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
}( angular ) );