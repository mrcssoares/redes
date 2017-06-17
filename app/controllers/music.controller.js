/**
 * Created by duivilly on 04/05/17.
 */
angular.module("song").controller('musicController', function ($scope, $timeout, $state, objectUser, $http, config) {

    if(!objectUser){
        $state.go("login.index")
    }

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
        if(confirm('Tem certeza que deseja adicionar esta música?')) {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.baseUrl + "/api/musics",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-access-token": config.apikey
                },
                "data": {
                    "name": music.nome,
                    "duration": '3000',
                    "id_category": music.categoria,
                    "id_singer": music.artista,
                    "status": "1",
                    "id_user": objectUser.id
                }
            };

            $.ajax(settings).success(function (music, response) {
                console.log(response);
                $scope.$apply($scope.listarMusicas());
                //var nome= document.getElementById('nome');
                //var artista= document.getElementById('artista');
                //var categoria = document.getElementById('categoria');
                //var duracao = document.getElementById('duracao');
                //duracao.value = "";
                console.log('add music');
                //if(nome == null || artista == undefined || categoria == ""){
                //    alert('Informe todos os campos!')
                //}else{
                    //$timeout(function () {
                    //    $('#dialogAdicionarMusic').trigger('click');
                    //}, 1000);

                    $state.go('music');
                    $timeout(function () {
                        location.reload();
                    });
                //}
                //nome.value = "";
                //artista.value = "";
                //categoria.value = "";
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
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
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
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
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

    $scope.callAddArtist = function(){
        $('#dialogAdicionarArtista').trigger('click');
    }

    $scope.adicionarArtista = function(artista) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/singers",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            },
            "data": {
                'name': artista.nome
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.listarArtista();
            //var inputArtista= document.getElementById('inputArtista');
            //inputArtista.value= "";

            $state.go('music.artista');
            $timeout(function () {
                location.reload();
            });
        });
    };

    $scope.callAddCategory = function(){
        $('#dialogAdicionarCategoria').trigger('click');
    }

    $scope.adicionarCategoria = function(categoria) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/category",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
            },
            "data": {
                'name': categoria.nome
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.listarCategorias();
            //$scope.$emit('someEvent', 'categoria');

            $state.go('music.categoria');
            $timeout(function () {
                location.reload();
            });

            //var inputCategoria= document.getElementById('inputCategoria');
            //inputCategoria.value= "";
        });
    };

    $scope.listarMusicas = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/musics",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
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
        if(confirm('Tem certeza que deseja apagar esta música?')) {
            console.log('Id da música(delete): ' + music.music_id);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.baseUrl + "/api/musics/delete/"+ music.music_id,
                "method": "delete",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-access-token": config.apikey
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                $scope.listarMusicas();
            });
        }
    };

    $scope.apagarCategoria = function(categoria) {
        if(confirm('Tem certeza que deseja apagar esta categoria?')) {
            //console.log('Id da música(delete): ' + music.music_id);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.baseUrl + "/api/category/"+categoria.id,
                "method": "DELETE",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-access-token": config.apikey
                },
                "data": {
                    id: categoria.id
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                $scope.listarCategorias();
            });
        }
    };

    $scope.apagarArtista = function(artista) {
        if(confirm('Tem certeza que deseja apagar este artista?')) {
            //console.log('Id da música(delete): ' + music.music_id);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.baseUrl + "/api/singers/"+artista.id,
                "method": "DELETE",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-access-token": config.apikey
                },
                "data": {
                    id: artista.id
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                $scope.listarArtista();
            });
        }
    };

    $scope.goNovaMusica = function () {
        // body...
        $state.go('music.adicionar');
    };

    $scope.goListCategory = function () {
        // body...
        $state.go('music.categoria');
    };

    $scope.goListArtist = function () {
        // body...
        $state.go('music.artista');
    };

    $scope.listarArtista();
    $scope.listarCategorias();
    $scope.listarMusicas();
});