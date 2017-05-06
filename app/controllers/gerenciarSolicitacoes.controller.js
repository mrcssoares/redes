/**
 * Created by duivilly on 06/05/17.
 */
angular.module("song").controller('gerenciarSolicitacoesController', function ($scope, config){
    
    $scope.solicitacoes= [];

	$scope.listarSolicitacoes = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/solicitations",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.solicitacoes= response.solicitations;
        });
    }

    $scope.listarSolicitacoes();

});