/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('loginController', function ($scope, $state) {

    $scope.login = function () {
        $state.go('home.index', {}, {
            location: 'replace'
        });

    }

});
