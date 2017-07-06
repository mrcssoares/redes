/**
 * Created by marcos on 06/07/17.
 */
angular.module("song").controller('rankingController', function ($scope, $state, objectUser, $timeout, config) {

    if(!objectUser){
        $state.go("login.index")
    }

    $scope.listarMelhores = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/solicitations/ranking/",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.melhores= response.melhores;
            $timeout(function(){
                $scope.$apply($scope.melhores= response.melhores)
            }, 1000)
        });
    };
    $scope.listarMelhores();

});