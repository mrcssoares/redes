/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('mainController', function ($scope, $rootScope, $state, $timeout) {

    $scope.user = localStorage.getItem('user');
    $scope.photo = localStorage.getItem('photo');
    $scope.sLogin = localStorage.getItem('Slogin');
    $scope.login = localStorage.getItem('type');

    console.log('login '+$scope.login);

    //escuta eventos vindos de outros controllers
    $scope.$on('someEvent', function(event, data) {
        console.log('data: '+ data);
        if(data === 'login' || data == 'login' || data.includes('login')){
            $state.go('home');
            $timeout(function () {
                location.reload();
            },1000);
        }

    });


    $scope.sair = function () {
        $scope.login = false;
        localStorage.clear();
        $state.go('login.index', {}, {
            location: 'replace'
        });
    }
});
