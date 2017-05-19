/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('homeController', function ($scope, objectUser, config, $timeout){

    $scope.listarSolicitacoes = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/solicitations",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.solicitacoes= response.solicitations;
            $timeout(function(){
                $scope.$apply($scope.solicitacoes= response.solicitations)
            }, 1000)
        });
    };
    $scope.listarSolicitacoes();
});
