/**
 * Created by duivilly on 06/05/17.
 */
angular.module("song").controller('gerenciarSugestoesController', function ($scope){
    
	$scope.musics= [];

	$scope.listarMusicas = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/api/musics",
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
        });
    }

	$scope.listarMusicas();    

});