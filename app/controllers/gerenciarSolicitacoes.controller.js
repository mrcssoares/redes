/**
 * Created by duivilly on 06/05/17.
 */
angular.module("song").controller('gerenciarSolicitacoesController', function ($scope, $state,  $timeout, config, objectUser, fcmRegister){
    console.log(objectUser);
    if(!objectUser){
        $state.go("login.index")
    }
    $scope.solicitacoes= [];

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
            })
        });
    };
    $scope.aceitarSolicitacao = function(solicitacao, status) {
        if(status == 0) status = "aprovar";
        else status = "remover";
        if(confirm("Deseja "+status+" este usuario?")){
            var settings = fcmRegister.verifyFCM(solicitacao.id_user);
            $.ajax(settings).done(function (response) {
                console.log(response);
                if(status == "aprovar") {
                    var key = config.songKey;
                    var to = response.fcm[0].fcm_id;//'cRT1-OSrRHA:APA91bG3EumpJVq3ZhAtA2s17CeaG7bIv2mwD6QvCo9IB85RnPX0d5-30SMTa5saJkkxw72JKxBsStdDZPUlyjPsabL8kYIwvCI5rXAODgrtkIy1Sig3z-IiCSTbGprk-M-VPSpCKavM';
                    var notification = {
                        'title': 'Chegou sua vez de cantar!!',
                        'body': 'De o seu melhor 😍 !!!'
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
                }
            });


            console.log('Id da solicitacao(put): '+solicitacao.id);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.baseUrl +"/api/solicitations/status/" + solicitacao.id,
                "method": "PUT",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-access-token": config.apikey
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                $scope.listarSolicitacoes();
            });
        }
    };

    $scope.listarSolicitacoes();

});