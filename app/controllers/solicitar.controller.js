/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('solicitarController', function ($scope,config) {

    $scope.listarMusicas = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/musics",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {

            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.musics= response.musics;
        });
    };
    $scope.listarMusicas();

});
