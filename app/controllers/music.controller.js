/**
 * Created by duivilly on 04/05/17.
 */
angular.module("song").controller('musicController', function ($scope, $http) {

	$scope.nome= '';
	$scope.duracao= '';
	$scope.categoria= '';
	$scope.artista= '';
    $scope.artistas= [];
    $scope.categorias= [];
    $scope.musics= [];
	console.log('musics');  

    $scope.adicionar = function (music) {
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
                "duration": music.duracao,
                "id_category": music.categoria,
                "id_singer": music.artista,
                "status": "0"
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
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

    $scope.adicionarArtista = function(artista) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/singers",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'name': artista.nome
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.listarArtista();
        });
    };

    $scope.adicionarCategoria = function(categoria) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/category",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'name': categoria.nome
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.listarCategorias();
        });
    };

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

    $scope.apagarMusica = function(music) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/musics",
            "method": "POST",
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

    $scope.listarArtista();
    $scope.listarCategorias();
    $scope.listarMusicas();

});