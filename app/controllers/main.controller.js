/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('mainController', function ($scope, $state) {
    $scope.islogin = true;
    $scope.sair = function () {
        $scope.islogin = false;
        $state.go('login.index', {}, {
            location: 'replace'
        });
    }
});
