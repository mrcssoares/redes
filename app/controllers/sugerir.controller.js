/**
 * Created by marcos on 25/04/17.
 */
angular.module("song").controller('sugerirController', function ($scope) {
    $scope.islogin = true;

    //exemplo
    $scope.carregarClientesPorData = function (date_start, date_end) {
        var NovaDate_start = date_start.value.getDate() + "/" + (date_start.value.getMonth() + 1) + "/" + date_start.value.getFullYear()
        var NovaDate_end = date_end.value.getDate() + "/" + (date_end.value.getMonth() + 1) + "/" + date_end.value.getFullYear()
    
        $http({
            url: config.baseUrl + "/dash/users",
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': config.token
            },
            data: {
                'date_start': NovaDate_start,
                'date_end': NovaDate_end,
            }
        }).success(function (data) {
            $scope.clientes = data;

            $scope.data_start = {
                value: new Date(date_start.value.getFullYear(), date_start.value.getMonth(), date_start.value.getDate()),
            };
            $scope.data_end = {
                value: new Date(date_end.value.getFullYear(), date_end.value.getMonth(), date_end.value.getDate()),
            };
        }).error(function (error) {
            $scope.message = "Aconteceu um problema: " + error;
        });
    };
    
});
