/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('homeController', function ($scope, objectUser, $state, config, $timeout, likeService){

    if(!objectUser){
        $state.go("login.index")
    }

    $scope.listarSolicitacoes = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/solicitations/user/"+ objectUser.id,
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            }
        };

        $.ajax(settings).done(function (response) {
            $scope.solicitacoes = response.solicitations;
            $timeout(function () {
                $scope.$apply($scope.solicitacoes = response.solicitations);
                console.log($scope.solicitacoes);
                //$scope.addcurtiu();
                   console.log('olar');
                    twemoji.size = '16x16';
                    twemoji.parse(document.body);

            }, 1000);
            // $timeout(function () {
            //     window.onload = function() {
            //        twemoji.size = '16x16';
            //        twemoji.parse(document.body);
            //     };
            // });
        });
    };
    $scope.listarSolicitacoes();

    // $scope.addcurtiu = function () {
    //     //percorre as solicitações verificando se há likes
    //     for (solicitacao in $scope.solicitacoes) {
    //         var settings = likeService.verifyLike($scope.solicitacoes[solicitacao].id_user, $scope.solicitacoes[solicitacao].id);
    //         $.ajax(settings).done(function (data) {
    //             if (data.likes.length == 0) {
    //                 $scope.solicitacoes[solicitacao].curtiu = false;
    //             } else {
    //                 $scope.solicitacoes[solicitacao].curtiu = true;
    //             }
    //             flag = false;
    //             console.log('olar');
    //             console.log($scope.solicitacoes);
    //         });
    //     }
    // };

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
        if(solicitacao.status == 0){
            msn= msn+'\nSe preparando para cantar '+'"'+solicitacao.name_music+'"';
        }else{
            msn= msn+'\nEstá cantando '+'"'+solicitacao.name_music+'"';
        }

        FB.ui({
          method: 'feed',
          link: 'https://api.upawa.com.br/redes/',
          description: msn,
        }, function(response){});
        console.log('compartilhando feed...');
    };

    $scope.like = function (solicitacao) {
        //verifica se ja curtiu
        var settings = likeService.verifyLike( objectUser.id, solicitacao.id);
        $.ajax(settings).done(function (data) {
            console.log(data.likes.length);
            //se nunca curtiu
            if(data.likes.length == 0){
                var settings = likeService.addLike( objectUser.id, solicitacao.id, 1);
                $.ajax(settings).done(function (data) {
                    console.log(data);
                    $scope.listarSolicitacoes();
                });
            //se já curtiu
            }else{
                // //verifica o status
                // var settings = likeService.verifyLike( objectUser.id, solicitacao.id);
                // $.ajax(settings).done(function (data) {
                    console.log(data.likes[0].status);
                    var status;
                    //da pra entender sem comentarios
                    if(data.likes[0].status == 0){
                        status = 1;
                    }else{
                        status = 0;
                    }
                    //upa
                    var settings = likeService.updateLike( objectUser.id, solicitacao.id, status);
                    $.ajax(settings).done(function (data) {
                        console.log(data);
                        $scope.listarSolicitacoes();
                    });
                // });

            }
        })
    };

    // $scope.seraqueeucurti = function (solicitacao) {
    //     var settings = likeService.verifyLike(solicitacao.id_user, solicitacao.id);
    //     $.ajax(settings).done(function (data) {
    //         if(data.likes.length == 0){
    //             return true;
    //         }else{
    //             return false;
    //         }
    //     });
    // };

    //
});
