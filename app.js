/**
 * Created by marcos on 23/03/17.
 */
angular.module('song', ['ngRoute']).config(function ($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: 'app/pages/home.html',
            controller: 'homeController'
        })
        .when('/solicitar', {
            templateUrl: 'app/pages/solicitar.html',
            controller: 'solicitarController'
        })
        .when('/sugerir', {
            templateUrl: 'app/pages/sugerir.html',
            controller: 'sugerirController'
        })
        .when('/login', {
            templateUrl: 'app/pages/login.html',
            controller: 'loginController'
        })
        .otherwise({redirectTo: '/home'});

});