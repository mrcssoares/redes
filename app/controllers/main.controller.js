/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('mainController', function ($scope, objectUser, $rootScope, $state, $timeout, fcmRegister, config) {

    $scope.objectUser = objectUser;
    if(objectUser) $scope.login = $scope.objectUser.type;
    else $scope.login = 0;
    console.log('login '+$scope.login);

    //$scope.baseUrl = "http://localhost:3000";
    $scope.baseUrl = "https://api.upawa.com.br:8080";

    if(window.location.hash != '#/login/index'){
        $scope.novas = true;
        $scope.listarSolicitacoes = function() {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": $scope.baseUrl +"/api/solicitations/new/count",
                "method": "GET",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-access-token": 'redesEtop'
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                $scope.aguardando= response.solicitations[0].novas;
                $timeout(function() {
                    $scope.$apply($scope.aguardando = response.solicitations[0].novas);
                });

            });
        };
        $scope.listarSugestoes = function() {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": $scope.baseUrl +"/api/musics/sugestions/new/count",
                "method": "GET",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-access-token": 'redesEtop'
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                $scope.aguardando_s= response.musics[0].novas;
                $timeout(function() {
                    $scope.$apply($scope.aguardando_s = response.musics[0].novas);
                });

            });
        };
        $scope.listarSolicitacoes();
        $scope.listarSugestoes();
    }
    //escuta eventos vindos de outros controllers
    $scope.$on('someEvent', function(event, data) {
        console.log('data: '+ data);
        if(data === 'login' || data == 'login' || data.includes('login')){
            $state.go('home');
            $timeout(function () {
                location.reload();
            });
        }
        if(data === 'solicitacao' || data == 'solicitacao' || data.includes('solicitacao')) {
            $state.go('home');
            $timeout(function () {
                location.reload();
            });
        }
        if(data === 'aprovando' || data == 'aprovando' || data.includes('aprovando')) {
            $timeout(function () {
                $scope.listarSolicitacoes();
            });
        }

    });

    //================================ INICIALIZANDO FIREBASE ===============================================//


    var config = {
        apiKey: "AIzaSyATZX2Qbec5fNlEMtmTd-8wDfwr-fVwtcw",
        authDomain: "meu-projeto-8d9fb.firebaseapp.com",
        databaseURL: "https://meu-projeto-8d9fb.firebaseio.com",
        projectId: "meu-projeto-8d9fb",
        storageBucket: "meu-projeto-8d9fb.appspot.com",
        messagingSenderId: "493131933192"
    };

    firebase.initializeApp(config);
    const messaging = firebase.messaging();

    //----------------------------pedindo permissão para notificação----------------------------------------//
    if(objectUser) {
        messaging.requestPermission()
        //se há permissão
            .then(function () {
                console.log('Permissão de notificação concedida! :)');
                //console.log(messaging.getToken());
                return messaging.getToken();
            })
            //emitindo token para sessão
            .then(function (token) {
                console.log(token);

                var settings = fcmRegister.verifyFCM($scope.objectUser.id);
                $.ajax(settings).done(function (response) {
                    console.log(response.fcm);
                    if (response.fcm.length == 0) {
                        //registra fcm para usuario
                        var settings = fcmRegister.createFCM($scope.objectUser.id, token);
                        $.ajax(settings).done(function (response) {
                            console.log({'criou': response});
                        });
                    } else {
                        //atualiza fcm para usuario
                        var settings = fcmRegister.updateFCM($scope.objectUser.id, token);
                        $.ajax(settings).done(function (response) {
                            console.log({'updetou': response});
                        });
                    }
                });

            })
            // se não houver permissão
            .catch(function (err) {
                console.log('Erro ao obter permissão: ' + err);
            });
    }




    //escuta novas notificações
    messaging.onMessage(function(payload) {
        console.log("Message received. ", payload);
        // if(payload.notification.title == 'Nova solicitação!') {
        //     var  notification = new Notification(payload.notification.title, {
        //         icon: 'app/assets/images/touch-music-karaoke.jpg',
        //         body: payload.notification.body
        //     });
        //
        //     notification.onclick = function () {
        //         notification.close();
        //         window.focus();
        //     };
        //     location.reload();
        // }else{
            $scope.listarSolicitacoes();
            $scope.listarSugestoes();
            var notification = new Notification(payload.notification.title, {
                icon: 'app/assets/images/touch-music-karaoke.jpg',
                body: payload.notification.body
            });

            notification.onclick = function () {
                notification.close();
                window.focus();
            };
            if (objectUser.type == 1) {
                alert(payload.notification.title);
                location.reload();
            }
        $scope.novas = true;
        // }

    });


    $scope.sair = function () {
        localStorage.clear();
        $state.go('login.index', {}, {
            location: 'replace'
        });
        $timeout(function () {
            location.reload();
        });

    };

   //AQUI VOU COLOCAR O CONTROLLER DAS SOLICITAÇÕES


});
