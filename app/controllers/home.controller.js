/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('homeController', function ($scope){
    $scope.islogin = true;
    $scope.user = localStorage.getItem('user');
    $scope.photo = localStorage.getItem('photo');
});
