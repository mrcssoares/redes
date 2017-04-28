/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('mainController', function ($scope, $state) {
	$scope.user= sessionStorage.getItem('user');
    $scope.photo= sessionStorage.getItem('photo');

    $scope.islogin = true;
    console.log($scope.islogin);

    $scope.sair = function () {
        $scope.islogin = false;
        sessionStorage.removeItem('user')
        $state.go('login.index', {}, {
            location: 'replace'
        });
    }
});
