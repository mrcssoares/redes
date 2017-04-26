/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('mainController', function ($scope) {
    $scope.teste = 'testando model';
    if(localStorage.getItem('login') == 'true'){
        $scope.islogin = true;
    }

    console.log(localStorage.getItem('login'));
});
