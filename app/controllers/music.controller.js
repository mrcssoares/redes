/**
 * Created by duivilly on 04/05/17.
 */
angular.module("song").controller('musicController', function ($scope, $http) {

	$scope.nome= '';
	$scope.duracao= '';
	$scope.categoria= '';
	$scope.artista= '';
	console.log('musics');  

    $scope.adicionar = function () {  
    	console.log('função adicionar');  
        $http({
            url: "http://localhost:3000/api/musics",
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                //'id': '',
                'name': $scope.nome,
                'duration': $scope.duracao,
                'id_catagory': $scope.categoria,
                'id_singer': $scope.artista,
            }
        }).success(function (data) {
            console.log('sucess');
        }).error(function (error) {
            $scope.message = "Aconteceu um problema: " + error;
        });
    };

});