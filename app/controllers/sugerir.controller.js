/**
    * Created by dara on 25/04/17.
    */
angular.module("song").controller('sugerirController', function ($scope,config) {

    $scope.sugerir = function (music) {
        console.log(music);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/musics",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "name": music.nome,
                "duration": '0',
                "id_category": music.categoria,
                "id_singer": music.artista,
                "status": "0"
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    };

    $scope.listarCategorias = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/category",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {

            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.categorias = response.category;
        });
    };

    $scope.listarArtista = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/singers",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {

            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.artistas = response.singers;
        });
    };

    $scope.listarCategorias();
    $scope.listarArtista();

});
