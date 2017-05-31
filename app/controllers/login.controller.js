/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('loginController', function ($scope, objectUser, $rootScope, $state, $timeout, config) {

    if(objectUser){
        $state.go("home.index")
    }

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
        console.log('entrando...');

        // chama Login do Facebook com as devidas permissoes
        function callFacebookLogin () {
            FB.login(function(response) {
                if (response.authResponse) {
                    console.log('logando...');
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
        console.log(response);

        if (response.status === 'connected') {
            console.log("conectado");
            // Logged into your app and Facebook.
            $scope.loginFacebook();

        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            console.log('não conectado');
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            console.log('error');
        }
    }
    
    $scope.loginFacebook = function () {
        FB.api('/me', {fields: 'name, email'}, function (response) {
            //aqui tem os dados do facebook, depois é so passar pra sessão e pra rota em caso de cadastro
            console.log('Facebook:');
            console.log(response);
            $scope.photo = "https://graph.facebook.com/"+response.id+"/picture";
            if(response.email){
                $scope.loginCliente(response.name, response.email, $scope.photo);
            }else{
                $('#semEmail').trigger('click');
                $scope.responseTemp= response;
            }

        });
    };

    $scope.sendEmail= function(email){
        $scope.loginCliente($scope.responseTemp.name, email, $scope.photo);
    }

    $scope.loginCliente = function (nome, email, photo) {
        localStorage.setItem('type', '1');
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/users/empty",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            },
            "data": {
                "email": email
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            //se usuário ainda não foi cadastrado
            if(response.users.length == 0){
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": config.baseUrl+"/api/users",
                        "method": "POST",
                        "headers": {
                            "content-type": "application/x-www-form-urlencoded",
                            "x-access-token": config.apikey
                        },
                        "data": {
                            'name': nome,
                            'email':email,
                            'photo': photo,
                            'type': "1"
                        }
                    };
                    //cadastra ele
                    $.ajax(settings).done(function (response) {
                        console.log(response);
                        var settings = {
                            "async": true,
                            "crossDomain": true,
                            "url": config.baseUrl+"/api/users/empty",
                            "method": "POST",
                            "headers": {
                                "content-type": "application/x-www-form-urlencoded",
                                "x-access-token": config.apikey
                            },
                            "data": {
                                "email": email
                            }
                        };
                        //busca ele de novo
                        $.ajax(settings).done(function (response) {
                            console.log(response);
                            localStorage.setItem('object-user', JSON.stringify(response.users[0]));
                            $scope.$emit('someEvent', 'login');

                        })
                    });
            }else{
                localStorage.setItem('object-user', JSON.stringify(response.users[0]));
                $scope.$emit('someEvent', 'login');
            }
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
                client_id: '548544741388-oqo7ha3uk7hqjd9o2ur2q62e3n62dmda.apps.googleusercontent.com',//'548544741388-oqo7ha3uk7hqjd9o2ur2q62e3n62dmda.apps.googleusercontent.com',
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
                //console.log(googleUser.getBasicProfile());
                googleUser.getBasicProfile().Paa = googleUser.getBasicProfile().Paa.replace('96-c', '500-c');

                console.log(googleUser.getBasicProfile());
                //estes dados vão pra rota
                $scope.loginCliente(googleUser.getBasicProfile().ig,googleUser.getBasicProfile().U3 ,googleUser.getBasicProfile().Paa);

            }
        );
    }



    //================================= Salvar Dados Client =========================================//

});
