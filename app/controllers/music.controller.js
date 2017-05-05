/**
 * Created by duivilly on 04/05/17.
 */
angular.module("song").controller('musicController', function ($scope, $http) {

	$scope.nome= '';
	$scope.duracao= '';
	$scope.categoria= '';
	$scope.artista= '';
	console.log('musics');  

    $scope.adicionar = function (music) {
        console.log(music);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/api/musics",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "name": music.nome,
                "duration": music.duracao,
                "id_category": music.categoria,
                "id_singer": music.artista,
                "status": "0"
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }

});