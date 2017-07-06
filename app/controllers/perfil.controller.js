/**
 * Created by marcos on 30/05/17.
 */
angular.module("song").controller('perfilController', function ($scope, $state, objectUser, $timeout, config) {

    if(!objectUser){
        $state.go("login.index")
    }

    $scope.listarSolicitacoes = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/solicitations/user/history/"+objectUser.id,
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
            }, 1000)
        });
    };
    $scope.listarSolicitacoes();

    // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/pt_BR/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    //
    $scope.publicar= function(solicitacao){
        FB.init({
            appId      : '1292868957469859',//'1292868957469859',
            cookie     : true,              // enable cookies to allow the server to access
            xfbml      : true,              // parse social plugins on this page
            version    : 'v2.8'             // use graph api version 2.8
        });

        var msn= solicitacao.name_user+": ";
            msn= msn+'\nCantou '+'"'+solicitacao.name_music+'" em ' + solicitacao.created_at + ".";

        FB.ui({
            method: 'feed',
            link: 'https://api.upawa.com.br/redes/',
            description: msn
        }, function(response){});
        console.log('compartilhando feed...');
    };

});