'use strict';
angular.module(appName).factory('EstadosServiceFactory', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

    var serviceBase = $rootScope.baseUrl;
    var estadosServiceFactory = {};

    var _getEstados = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/Estados/GetEstados')
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    estadosServiceFactory.getEstados = _getEstados;

    return estadosServiceFactory;
}]);