/**
 * Created by duivilly on 06/05/17.
 */
angular.module("song").controller('gerenciarSolicitacoesController', function ($scope, $state,  $timeout, config, objectUser){
    console.log(objectUser);
    if(!objectUser){
        $state.go("login.index")
    }
    $scope.solicitacoes= [];

	$scope.listarSolicitacoes = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/solicitations",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
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
            "url": config.baseUrl +"/api/solicitations/status/" + solicitacao.id,
            "method": "PUT",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.listarSolicitacoes();
        });
    };

    $scope.listarSolicitacoes();

});