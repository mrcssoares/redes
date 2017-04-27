angular.module('song').config(function ($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/login/index');
    $urlRouterProvider.when('/home', '/home/index');
    $urlRouterProvider.when('/sugerir', '/sugerir/index');
    $urlRouterProvider.when('/solicitar', '/solicitar/index');
    $urlRouterProvider.when('/login', '/login/index');


    //LOGIN
    $stateProvider.state('login', {
        url: '/login',
        template: '<ui-view></ui-view>'
    }).state('login.index', {
        url:'/index',
        templateUrl: 'app/pages/login.html',
        controller: 'loginController'
    }).
    //HOME
    state('home', {
        url: '/home',
        template: '<ui-view></ui-view>'
    }).state('home.index', {
        url:'/index',
        templateUrl: 'app/pages/home.html',
        controller: 'homeController'
    }).
    //SOLICITAR
    state('solicitar', {
        url: '/solicitar',
        template: '<ui-view></ui-view>'
    }).state('solicitar.index', {
        url:'/index',
        templateUrl: 'app/pages/solicitar.html',
        controller: 'solicitarController'
    }).
    // SUGERIR
    state('sugerir', {
        url: '/sugerir',
        template: '<ui-view></ui-view>'
    }).state('sugerir.index', {
        url:'/index',
        templateUrl: 'app/pages/sugerir.html',
        controller: 'sugerirController'
    });

});
