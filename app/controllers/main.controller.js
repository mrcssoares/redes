/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('mainController', function ($scope) {
    if(localStorage.getItem('login') == 'true'){
        $scope.islogin = false;
    }

    console.log(localStorage.getItem('login'));
});
