'use strict';
app.factory('TipoViajeServiceFactory', ['$http', '$q', '$rootScope', 'AuthenticationService', function ($http, $q, $rootScope, AuthenticationService) {

    var serviceBase = $rootScope.baseUrl;
    var tipoViajeServiceFactory = {};

    var _getTiposViaje = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/TipoViaje/GetTiposViaje')
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    tipoViajeServiceFactory.getTiposViaje = _getTiposViaje;

    return tipoViajeServiceFactory;
}]);