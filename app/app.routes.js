angular.module('song').config(function ($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/login/index');
    $urlRouterProvider.when('/home', '/home/index');
    $urlRouterProvider.when('/sugerir', '/sugerir/index');
    $urlRouterProvider.when('/solicitar', '/solicitar/index');
    $urlRouterProvider.when('/login', '/login/index');
    $urlRouterProvider.when('/music', '/music/index');
    $urlRouterProvider.when('/gerenciarSolicitacoes', '/gerenciarSolicitacoes/index');
    $urlRouterProvider.when('/gerenciarSugestoes', '/gerenciarSugestoes/index');

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
        //PERFIL
    state('perfil', {
        url: '/perfil',
        template: '<ui-view></ui-view>'
    }).state('perfil.index', {
        url:'/index',
        templateUrl: 'app/pages/perfil.html',
        controller: 'perfilController'
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
    }).
    // ADMIN MUSIC
    state('music', {
        url: '/music',
        template: '<ui-view></ui-view>'
    }).state('music.index', {
        url:'/index',
        templateUrl: 'app/pages/music.html',
        controller: 'musicController'
    }).
    state('music.adicionar', {
        url:'/adicionar',
        templateUrl: 'app/pages/musicNew.html',
        controller: 'musicController'
    }).
    // ADMIN SOLICITACAO
    state('gerenciarSolicitacoes', {
        url: '/gerenciarSolicitacoes',
        template: '<ui-view></ui-view>'
    }).state('gerenciarSolicitacoes.index', {
        url:'/index',
        templateUrl: 'app/pages/gerenciarSolicitacoes.html',
        controller: 'gerenciarSolicitacoesController'
    }).
    // ADMIN SUGESTOES
    state('gerenciarSugestoes', {
        url: '/gerenciarSugestoes',
        template: '<ui-view></ui-view>'
    }).state('gerenciarSugestoes.index', {
        url:'/index',
        templateUrl: 'app/pages/gerenciarSugestoes.html',
        controller: 'gerenciarSugestoesController'
    });

});
