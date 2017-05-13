/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('solicitarController', function ($scope, config, $timeout) {
    $scope.idUser = localStorage.getItem('id');

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

    $scope.solicitar = function(music) {
        //Data Atual
        var data= new Date();
        var dia= data.getDate();
        var mes= data.getMonth();
        var ano= data.getFullYear();

        var meses= new Array(12);

        meses[0]= "01";
        meses[1]= "02";
        meses[2]= "03";
        meses[3]= "04";
        meses[4]= "05";
        meses[5]= "06";
        meses[6]= "07";
        meses[7]= "08";
        meses[8]= "09";
        meses[9]= "10";
        meses[10]= "11";
        meses[11]= "12";

        var dataAtual= dia+"/"+meses[mes]+"/"+ano;
        console.log(dataAtual);
        console.log(music.music_id);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.baseUrl+"/api/solicitations",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": { 
                "likes": "0",
                "status": "0",
                "id_music": music.music_id,
                "id_user": 3,
                "created_at": dataAtual,
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    };

    $scope.listarMusicas();

});
