/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('loginController', function ($scope, $state, $timeout) {


    // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/pt_BR/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    //========================== Start Login facebook ====================================//

    $scope.init = function () {
        FB.init({
            appId      : '1292868957469859',//'1292868957469859',
            cookie     : true,  // enable cookies to allow the server to access
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' // use graph api version 2.8
        });
        console.log('entrou');

        // chama Login do Facebook com as devidas permissoes
        function callFacebookLogin () {
            FB.login(function(response) {
                if (response.authResponse) {
                    console.log('entrou');
                    FB.getLoginStatus(function(response) {
                        statusChangeCallback(response);
                    });
                }
            }, {
                scope: 'email,  public_profile'
            });
        }
        callFacebookLogin();
    };

    function statusChangeCallback (response) {
        console.log('statusChangeCallback');
        console.log(response);

        if (response.status === 'connected') {
            console.log("autorizado");
            // Logged into your app and Facebook.
            $scope.loginFacebook();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            console.log('não autorizado');
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            console.log('error');
        }
    }
    $scope.loginFacebook = function () {
        FB.api('/me', {fields: 'name, email'}, function (response) {
            //aqui tem os dados do facebook, depois é so passar pra sessão e pra rota em caso de cadastro
            console.log(response);
        });
    };

    $scope.checkLoginState = function () {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    };


    //================================= Start Login Gmail =========================================//

    $scope.isGoogle = false;
    var googleUser = {};
    $scope.startApp = function() {
        gapi.load('auth2', function(){
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
                client_id: '493131933192-s5rib8078regv2mtffe3g221k8fmh56h.apps.googleusercontent.com',//'548544741388-oqo7ha3uk7hqjd9o2ur2q62e3n62dmda.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin'

            });
            if($scope.isGoogle == false) {
                attachSignin(document.getElementById('customBtn'));
                $scope.isGoogle = true;
            }
            $timeout(function () {
                $('#customBtn').trigger('click');
            }, 200);
        });
    };

    function attachSignin(element) {
        auth2.attachClickHandler(element, {},
            function (googleUser) {
                console.log(googleUser.getBasicProfile());
                googleUser.getBasicProfile().Paa = googleUser.getBasicProfile().Paa.replace('96-c', '500-c');
                console.log(googleUser.getBasicProfile().Paa);
                //com estes dados vai pra rota

            }
        );
    }

});