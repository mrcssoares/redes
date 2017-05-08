/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('mainController', function ($scope, $rootScope, $state, $timeout) {
	$scope.user = localStorage.getItem('user');
    $scope.photo = localStorage.getItem('photo');
    $scope.sLogin = localStorage.getItem('Slogin');
    console.log($scope.sLogin);
    if($scope.sLogin != null) $scope.login = true;
    console.log('login '+$scope.login);

    function waitLoc() {
        $scope.user = localStorage.getItem('user');
        $scope.photo = localStorage.getItem('photo');
        $scope.sLogin = localStorage.getItem('SLogin');
        console.log($scope.sLogin);
        if($scope.sLogin != null) $scope.login = true;
        console.log('login '+$scope.login);
        if ($scope.login == true) {
            console.log('parou');
            $timeout.cancel();
        } else {
            $timeout(function () {
                waitLoc();
            }, 2000);
        }
    }
    waitLoc();

    $scope.sair = function () {
        $scope.login = false;
        localStorage.clear();
        localStorage.clear();
        $state.go('login.index', {}, {
            location: 'replace'
        });
    }
});
