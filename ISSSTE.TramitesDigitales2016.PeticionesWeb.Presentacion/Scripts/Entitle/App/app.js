var app = angular.module('TurisssteApp', ['ngRoute', 'ngMessages', 'ngAnimate', 'ui.router', 'LocalStorageModule'])
.config(['$routeProvider', '$sceDelegateProvider', '$urlRouterProvider', function ($routeProvider, $sceDelegateProvider, $urlRouterProvider) {

    $routeProvider
        .when('/Demo', {
            templateUrl: 'Scripts/Entitle/App/Views/Demo.html',
            controller: 'DemoController'
        })
        .when('/Encuesta', {
            templateUrl: '../Scripts/Entitle/App/Views/Derechohabiente/Encuesta.html',
            controller: 'EncuestaController'
        })
        .when('/Preferencias/:IdDerechohabiente', {
            templateUrl: '../Scripts/Entitle/App/Views/Derechohabiente/Preferencias.html',
            controller: 'PreferenciasController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.run(['$rootScope', '$location', '$anchorScroll', function ($rootScope, $location, $anchorScroll) {
    var host = $location.host();

    if (host === "localhost") {
        host += ":" + $location.port();
    }

    $rootScope.baseUrl = $location.protocol() + "://" + host;

    $anchorScroll.yOffset = -350;
}]);
