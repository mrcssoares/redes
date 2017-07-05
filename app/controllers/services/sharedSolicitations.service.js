/**
 * Created by marcos on 04/07/17.
 */
angular.module('song').factory('sharedSolicitations', ['$state', '$rootScope', 'config', '$timeout', function(objectUser, $state, $rootScope, config, $timeout) {
    var SharedSolicitationsObj = {};
    SharedSolicitationsObj.config = config;
    SharedSolicitationsObj.listarSolicitacoes = function(config) {
        console.log(config);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/solicitations/user/"+objectUser.id,
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $rootScope.solicitacoes= response.solicitations;

            //$rootScope.$apply( $rootScope.solicitacoes= response.solicitations);
            $rootScope.isSinging= false;
            for(sol in $rootScope.solicitacoes){
                if($rootScope.solicitacoes[sol].status == 1){
                    $rootScope.isSinging= true;
                }
            }
        });
    };

    return SharedSolicitationsObj;
}]);