/**
 * Created by duivilly on 06/05/17.
 */
angular.module("song").controller('gerenciarSugestoesController', function ($scope, $state, objectUser, $timeout, config, fcmRegister){

    if(!objectUser){
        $state.go("login.index")
    }

    $scope.musics= [];
    $scope.listarMusicas = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/musics/sugestions",
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

    $scope.aceitarMusica = function(music) {
        if(confirm("Deseja adicionar essa musica?")){

            var settings = fcmRegister.verifyFCM(music.id_user);
            $.ajax(settings).done(function (response) {
                console.log(response);
                var key = config.songKey;
                var to = response.fcm[0].fcm_id;//'cRT1-OSrRHA:APA91bG3EumpJVq3ZhAtA2s17CeaG7bIv2mwD6QvCo9IB85RnPX0d5-30SMTa5saJkkxw72JKxBsStdDZPUlyjPsabL8kYIwvCI5rXAODgrtkIy1Sig3z-IiCSTbGprk-M-VPSpCKavM';
                var notification = {
                    'title': 'Sua musica foi aceita!!',
                    'body': 'Aproveite e a solicite para cantar 😜!!!'
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
                    $scope.$emit('someEvent', 'aprovando');

                    console.log(response);
                }).catch(function (error) {
                    console.error(error);
                })
            });

            console.log('Id da música(put): '+music.music_id);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.baseUrl+"/api/musics/status/" + music.music_id,
                "method": "PUT",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-access-token": config.apikey
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                $scope.listarMusicas();
                $('#dialogAdicionarSugestaoAdmin').trigger('click');
            });
        }
    };

    $scope.recusarMusica = function(music) {
        if(confirm("Deseja recusar essa musica?")){

            var settings = fcmRegister.verifyFCM(music.id_user);
            $.ajax(settings).done(function (response) {
                console.log(response);
                var key = config.songKey;
                var to = response.fcm[0].fcm_id;//'cRT1-OSrRHA:APA91bG3EumpJVq3ZhAtA2s17CeaG7bIv2mwD6QvCo9IB85RnPX0d5-30SMTa5saJkkxw72JKxBsStdDZPUlyjPsabL8kYIwvCI5rXAODgrtkIy1Sig3z-IiCSTbGprk-M-VPSpCKavM';
                var notification = {
                    'title': 'Sua musica não pode ser aceita 😐!!',
                    'body': 'Ela pode está errada ou já existir em nossa playlist.'
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
                    $scope.$emit('someEvent', 'aprovando');
                }).catch(function (error) {
                    console.error(error);
                })
            });

            console.log('Id da música(put): '+music.music_id);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.baseUrl+"/api/musics/recusar/" + music.music_id,
                "method": "PUT",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-access-token": config.apikey
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                $scope.listarMusicas();
                //$('#dialogAdicionarSugestaoAdmin').trigger('click');
            });
        }
    };

    $scope.listarMusicas();

});