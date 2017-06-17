/**
    * Created by dara on 25/04/17.
    */
angular.module("song").controller('sugerirController', function ($scope, $state, objectUser, $timeout, config) {
    console.log(objectUser);
    if(!objectUser){
        $state.go("login.index")
    }

    $scope.sugerir = function (music) {
        
        if(confirm('Tem certeza que deseja adicionar esta música?')){
            console.log(music);

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.baseUrl+"/api/musics",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-access-token": config.apikey
                },
                "data": {
                    "name": music.nome,
                    "duration": '0',
                    "id_category": music.categoria,
                    "id_singer": music.artista,
                    "status": "0",
                    "id_user": objectUser.id
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

                $('#dialogAdicionarSugestao').trigger('click');
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
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
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
                "content-type": "application/x-www-form-urlencoded",
                "x-access-token": config.apikey
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
