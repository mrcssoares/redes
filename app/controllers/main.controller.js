/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('mainController', function ($scope, $rootScope, $state, $timeout) {
	$scope.user = sessionStorage.getItem('user');
    $scope.photo = sessionStorage.getItem('photo');
    $scope.sLogin = sessionStorage.getItem('sLogin');
    console.log('photo '+$scope.photo);

    function waitLoc() {
        if ($rootScope.login == true) {
            console.log('parou');
            $timeout.cancel();
        } else {
            $timeout(function () {
                console.log('login: '+ $rootScope.login);
                waitLoc();
            }, 2000);
        }
    }
    //waitLoc();

    $scope.sair = function () {
        $rootScope.login = false;
        sessionStorage.clear();
        $state.go('login.index', {}, {
            location: 'replace'
        });
    }
});
