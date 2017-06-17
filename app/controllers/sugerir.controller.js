/**
    * Created by dara on 25/04/17.
    */
angular.module("song").controller('sugerirController', function ($scope, $state, objectUser, $timeout, config, fcmRegister) {
    console.log(objectUser);
    if(!objectUser){
        $state.go("login.index")
    }

    $scope.sugerir = function (music) {
        
        if(confirm('Você esta prestes a sugerir esta musica. Deseja continuar?')){
            console.log(music);

            var settings = fcmRegister.getAdminFCM();
            $.ajax(settings).done(function (response) {
                console.log(response);
                var key = config.songKey;
                var to = response.fcm[0].fcm_id;//'cRT1-OSrRHA:APA91bG3EumpJVq3ZhAtA2s17CeaG7bIv2mwD6QvCo9IB85RnPX0d5-30SMTa5saJkkxw72JKxBsStdDZPUlyjPsabL8kYIwvCI5rXAODgrtkIy1Sig3z-IiCSTbGprk-M-VPSpCKavM';
                var notification = {
                    'title': 'Nova sugestão de música recebida!',
                    'body': 'Avalie a nova sugestão'
                };
                fetch('https://fcm.googleapis.com/fcm/send', {
                    'method': 'POST',
                    'headers': {
                        'Authorization': 'key=' + key,
                        'Content-Type': 'application/json'
                    },
                    'body': JSON.stringify({
                        'notification': notification,
                        'to': to
                    })
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.error(error);
                })
            });

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.baseUrl+"/api/musics",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-access-token": config.apikey
                },
                "data": {
                    "name": music.nome,
                    "duration": '0',
                    "id_category": music.categoria,
                    "id_singer": music.artista,
                    "status": "0",
                    "id_user": objectUser.id
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                var nome= document.getElementById('nome');
                nome.value= '';
                var artista= document.getElementById('artista');
                artista.value= '';
                var categoria= document.getElementById('categoria');
                categoria.value= '';

                $scope.listarMusicas();

                $('#dialogAdicionarSugestao').trigger('click');
            });
        }
    };

    $scope.listarCategorias = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/category",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.categorias = response.category;
            $timeout(function(){
                $scope.$apply($scope.categorias = response.category)
            })
        });
    };

    $scope.listarArtista = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/singers",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.artistas = response.singers;
            $timeout(function(){
                $scope.$apply($scope.artistas = response.singers)
            })
        });
    };

    $scope.listarMusicas = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/musics/sugestions/user/"+objectUser.id,
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            },
            "data": {

            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.musics= response.musics;
            $timeout(function(){
                $scope.$apply($scope.musics = response.musics)
            })
        });
    };

    $scope.listarMusicas();
    $scope.listarCategorias();
    $scope.listarArtista();

});
