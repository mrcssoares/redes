/**
 * Created by duivilly on 06/05/17.
 */
angular.module("song").controller('gerenciarSolicitacoesController', function ($scope, $timeout, config, objectUser){
    console.log(objectUser);
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
            $timeout(function(){
                $scope.$apply($scope.solicitacoes= response.solicitations)
            })
        });
    };
    $scope.aceitarSolicitacao = function(solicitacao) {
        console.log('Id da solicitacao(put): '+solicitacao.id);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/api/solicitations/status/" + solicitacao.id,
            "method": "PUT",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.listarSolicitacoes();
        });
    };

    $scope.listarSolicitacoes();

});