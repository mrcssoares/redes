/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('mainController', function ($scope, objectUser, $rootScope, $state, $timeout, fcmRegister, config) {

    $scope.objectUser = objectUser;
    if(objectUser) $scope.login = $scope.objectUser.type;
    else $scope.login = 0;
    console.log('login '+$scope.login);

    //para compartilhar dados no facebook
    $scope.listarSolicitacoes = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/solicitations",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.solicitacoes= response.solicitations;
            $timeout(function(){
                $scope.$apply($scope.solicitacoes= response.solicitations)
            }, 1000)
        });
    };
    $scope.listarSolicitacoes();
    //

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
        var notification = new Notification(payload.notification.title, {
            icon: 'app/assets/images/touch-music-karaoke.jpg',
            body: payload.notification.body
        });
        notification.show();
        notification.onclick = function () {
            notification.close();
            window.focus();
        };
        const notificationTitle = payload.notificationtitle;
        const notificationOptions = {
            body: payload.notification.body,
            icon: 'app/assets/images/touch-music-karaoke.jpg',
            vibrate: [200, 100, 200, 100, 200, 100, 400]
        };
        return self.registration.showNotification(notificationTitle, notificationOptions);
        alert(payload.notification.title);

    });


    $scope.sair = function () {
        localStorage.clear();
        $state.go('login.index', {}, {
            location: 'replace'
        });
        $timeout(function () {
            location.reload();
        });

    }
});
