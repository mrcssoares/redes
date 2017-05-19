/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('mainController', function ($scope, objectUser, $rootScope, $state, $timeout) {

    $scope.objectUser = objectUser;
    if(objectUser) $scope.login = $scope.objectUser.type;
    else $scope.login = 0;
    console.log('login '+$scope.login);

    //escuta eventos vindos de outros controllers
    $scope.$on('someEvent', function(event, data) {
        console.log('data: '+ data);
        if(data === 'login' || data == 'login' || data.includes('login')){
            $state.go('home');
            $timeout(function () {
                location.reload();
            },100);
        }

    });


    $scope.sair = function () {
        localStorage.clear();
        $state.go('login.index', {}, {
            location: 'replace'
        });
        $timeout(function () {
            location.reload();
        },100);

    }
});
