'use strict';
app.factory('TipoDestinoServiceFactory', ['$http', '$q', '$rootScope', 'AuthenticationService', function ($http, $q, $rootScope, AuthenticationService) {

    var serviceBase = $rootScope.baseUrl;
    var tipoDestinoServiceFactory = {};

    var _getTiposDestino = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/TipoDestino/GetTiposDestino')
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    tipoDestinoServiceFactory.getTiposDestino = _getTiposDestino;

    return tipoDestinoServiceFactory;
}]);