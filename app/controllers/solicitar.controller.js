/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('solicitarController', function ($scope, $state, config, objectUser, $timeout, fcmRegister) {
    console.log(objectUser);
    if(!objectUser){
        $state.go("login.index")
    }

    $scope.listarMusicas = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/musics",
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

    $scope.select = function (music) {
      $scope.id_music = music.music_id;
    };
        

    $scope.solicitar = function(music) {
        //Data Atual
        var data= new Date();
        var dia= data.getDate();
        var mes= data.getMonth();
        var ano= data.getFullYear();

        var meses= new Array(12);

        meses[0]= "01";
        meses[1]= "02";
        meses[2]= "03";
        meses[3]= "04";
        meses[4]= "05";
        meses[5]= "06";
        meses[6]= "07";
        meses[7]= "08";
        meses[8]= "09";
        meses[9]= "10";
        meses[10]= "11";
        meses[11]= "12";

        var dataAtual= dia+"/"+meses[mes]+"/"+ano;
        console.log(dataAtual);
        console.log($scope.id_music);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/solicitations",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            },
            "data": { 
                "likes": "0",
                "status": "0",
                "id_music":  $scope.id_music,
                "id_user": objectUser.id,
                "created_at": dataAtual
            }
        };
        console.log(settings);

        $.ajax(settings).done(function (response) {
            console.log(response);

            var settings = fcmRegister.getAdminFCM();
            $.ajax(settings).done(function (response) {
                console.log(response);
                var key = config.songKey;
                var to = response.fcm[0].fcm_id;//'cRT1-OSrRHA:APA91bG3EumpJVq3ZhAtA2s17CeaG7bIv2mwD6QvCo9IB85RnPX0d5-30SMTa5saJkkxw72JKxBsStdDZPUlyjPsabL8kYIwvCI5rXAODgrtkIy1Sig3z-IiCSTbGprk-M-VPSpCKavM';
                var notification = {
                    'title': 'Nova solicitação!',
                    'body': 'Gerencie suas solicitações! :D'
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
                    //$scope.$emit('someEvent', 'solicitacao');
                }).catch(function (error) {
                    console.error(error);
                })
            });



        });
    };

    $scope.listarMusicas();

});
