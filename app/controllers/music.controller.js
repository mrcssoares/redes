/**
 * Created by duivilly on 04/05/17.
 */
angular.module("song").controller('musicController', function ($scope, $timeout, $http, config) {

	$scope.nome= '';
	$scope.duracao= '';
	$scope.categoria= '';
	$scope.artista= '';
    $scope.artistas= [];
    $scope.categorias= [];
    $scope.musics= [];
	console.log('musics');

    $scope.adicionarMusica = function (music) {
        console.log(music);
        if(confirm('Tem certeza que deseja adicionar está musica?')) {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.baseUrl + "/api/musics",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded"
                },
                "data": {
                    "name": music.nome,
                    "duration": '3000',
                    "id_category": music.categoria,
                    "id_singer": music.artista,
                    "status": "1"
                }
            };

            $.ajax(settings).success(function (music, response) {
                console.log(response);
                $scope.$apply($scope.listarMusicas());
                var nome = document.getElementById('nome');
                nome.value = "";
                var duracao = document.getElementById('duracao');
                duracao.value = "";
                var artista = document.getElementById('artista');
                artista.value = "";
                var categoria = document.getElementById('categoria');
                categoria.value = "";
            });
        }
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
            $timeout(function(){
                $scope.$apply($scope.artistas = response.singers)
            })
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
            $timeout(function(){
                $scope.$apply($scope.categorias = response.category)
            })
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
            var inputArtista= document.getElementById('inputArtista');
            inputArtista.value= "";
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
            var inputCategoria= document.getElementById('inputCategoria');
            inputCategoria.value= "";
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
            $timeout(function(){
                $scope.$apply($scope.musics = response.musics)
            })
        });
    };

    $scope.apagarMusica = function(music) {
        if(confirm('Tem certeza que deseja apagar essa musica?')) {
            console.log('Id da música(delete): ' + music.music_id);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.baseUrl + "/api/musics/delete",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded"
                },
                "data": {
                    id: music.music_id
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                $scope.listarMusicas();
            });
        }
    };

    $scope.listarArtista();
    $scope.listarCategorias();
    $scope.listarMusicas();

});