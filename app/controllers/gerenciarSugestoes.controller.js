/**
 * Created by duivilly on 06/05/17.
 */
angular.module("song").controller('gerenciarSugestoesController', function ($scope, $timeout, config){
    
	$scope.musics= [];

	$scope.listarMusicas = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/musics/sugestions",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
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
        console.log('Id da música(put): '+music.music_id);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/api/musics/status/" + music.music_id,
            "method": "PUT",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
                "postman-token": "9df39487-089c-321f-f1c1-249cebe961df"
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.listarMusicas();
        });
    };

	$scope.listarMusicas();    

});