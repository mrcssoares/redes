/**
 * Created by marcos on 23/03/17.
 */
angular.module('song', ['ngRoute']).config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'pages/home.html',
                controller: 'homeController'
            })
            .when('/solicitar', {
                templateUrl: 'pages/solicitar.html',
                controller: 'solicitarController'
            })
            .when('/sugerir', {
                templateUrl: 'pages/sugerir.html',
                controller: 'sugerirController'
            })
            .otherwise({ redirectTo: '/home'});

    })
    .controller('homeController', function ($scope) {

    })
    .controller('solicitarController', function ($scope) {

    })
    .controller('sugerirController', function ($scope) {

    });