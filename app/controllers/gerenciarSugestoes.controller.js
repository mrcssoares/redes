/**
 * Created by duivilly on 06/05/17.
 */
angular.module("song").controller('gerenciarSugestoesController', function ($scope, $state, objectUser, $timeout, config){

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