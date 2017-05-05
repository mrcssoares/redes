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
    	console.log('função adicionar');  
        $http({
            url: "http://localhost:3000/api/musics",
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                'name': 'marcos',
                'duration': '1000',
                'id_catagory': '1',
                'id_singer': '1',
                'status': '0'
            }
        }).success(function (data) {
            console.log('sucess');
            console.log(data);
        }).error(function (error) {
            $scope.message = "Aconteceu um problema: " + error;
        });
    };

});