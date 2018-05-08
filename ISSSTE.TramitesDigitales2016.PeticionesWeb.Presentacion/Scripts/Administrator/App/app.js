//Variable global con el nombre del módulo
var appName = 'ISSSTE.TramitesDigitales2015.Turissste.App';

(function () {
    'use strict';

    //Se crea la aplicación
    var app = angular.module(appName, ['ngRoute', 'ngMessages', 'ngAnimate', 'naif.base64', 'ngSanitize', 'common', "LocalStorageModule", 'ngJsonExportExcel']);


    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/Reportes', {
                templateUrl: '../Scripts/Administrator/App/Views/Administrador/Reportes.html',
                controller: 'ReportesController'
            })
            .when('/AdministracionPaquetes', {
                templateUrl: '../Scripts/Administrator/App/Views/Administrador/Administracion.html',
                controller: 'AdminPaquetesController',//,
                resolve: {
                    //    catalogoDestinos: function (TipoDestinoServiceFactory) {
                    //        return TipoDestinoServiceFactory.getTiposDestino();
                    //    },
                    //    paquetesCargados: function (PaquetesTuristicosServiceFactory) {
                    //        return PaquetesTuristicosServiceFactory.getPaquetesTuristicos();
                    //    }
                    //    ,
                    rutaGlobalizadorInfo: function (ConfiguracionServiceFactory) {
                        return ConfiguracionServiceFactory.getConfigurationByKey('GlobalizadorLink');
                    }
                }
            })
            .when('/ReporteDinamico', {
                templateUrl: '../Scripts/Administrator/App/Views/Administrador/ReporteDinamico.html',
                controller: 'DinamicoController'
            })
            .when('/ReporteEstatico', {
                templateUrl: '../Scripts/Administrator/App/Views/Administrador/ReporteEstatico.html',
                controller: 'EstaticoController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

    //código de arranque de la aplicación
    app.run(['$route', '$window', '$rootScope', '$location', 'common', 'authenticationService', 'webApiService', startup]);

    //#region Fields

    var $rootScopeReference;
    var $routeProviderReference;
    var $routeReference;
    var $windowReference;
    var commonReference;
    var authenticationServiceReference;
    var webApiServiceReference;
    var host;
    var $rootScope;

    //#endregion

    //#region Información del usuario

    function startup($route, $window, $rootScope, $location, common, authenticationService, webApiService) {
        //Asignación de objetos injectados para su utilización despues
        $rootScopeReference = $rootScope;
        $routeReference = $route;
        $windowReference = $window;
        commonReference = common;
        authenticationServiceReference = authenticationService;
        webApiServiceReference = webApiService;

        var host = $location.host();

        if (host === "localhost") {
            host += ":" + $location.port();
        }

        $rootScope.baseUrl = $location.protocol() + "://" + host;

        //So configura el resolutor de errores
        //defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        //    errorMessages['required'] = Messages.validation.required;
        //    errorMessages['email'] = Messages.validation.email;
        //    errorMessages['number'] = Messages.validation.numbers;
        //    errorMessages['minlength'] = Messages.validation.minLenght;
        //    errorMessages['rfc'] = Messages.validation.rfc;
        //    errorMessages['curp'] = Messages.validation.curp;
        //});
    }

    //#endregion

    //#region Helper Functions

    function getUserRoles() {
        return webApiServiceReference.makeRetryRequest(1, function () {
            return authenticationServiceReference.getUserRoles();
        })
            .then(function (data) {
                commonReference.config.userRoles = data;
            })
            .catch(function (reason) {
                commonReference.showErrorMessage(reason, Messages.error.userRoles)
            });
    }

    function validateUrlAccess($location, necessaryRoles) {
        //Si caduco la sesión (token) y no se puede renovar, se enviara a la pantalla de logout
        webApiServiceReference.makeRetryRequest(1, function () {
            return authenticationServiceReference.validateToken();
        });
        if (!commonReference.doesUserHasNecessaryRoles(necessaryRoles))
            $windowReference.location.href = Constants.accountRoutes.login;
    }

    //#endregion

})();
