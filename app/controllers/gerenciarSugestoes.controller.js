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
            "url": config.baseUrl+"/api/musics/status/"+music.music_id,
            "type": "PUT",
            "contentType": "multipart/form-data",
            "crossDomain": true,
            "processData": false,
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.listarMusicas();
        });
    };

	$scope.listarMusicas();    

});