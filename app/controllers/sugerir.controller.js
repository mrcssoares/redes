/**
    * Created by dara on 25/04/17.
    */
angular.module("song").controller('sugerirController', function ($scope, $timeout, config) {

    $scope.sugerir = function (music) {
        if(confirm('Tem certeza que deseja adicionar esta musica?')){
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
                var nome= document.getElementById('nome');
                nome.value= "";
                var artista= document.getElementById('artista');
                artista.value= "";
                var categoria= document.getElementById('categoria');
                categoria.value= "";
            });
        }
    };

    $scope.listarCategorias = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/category",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
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

    $scope.listarArtista = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/singers",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
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

    $scope.listarCategorias();
    $scope.listarArtista();

});
