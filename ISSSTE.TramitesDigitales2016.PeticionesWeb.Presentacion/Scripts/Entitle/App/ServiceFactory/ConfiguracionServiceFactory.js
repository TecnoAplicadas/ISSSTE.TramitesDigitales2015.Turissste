'use strict';
app.factory('ConfiguracionServiceFactory', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

    var serviceBase = $rootScope.baseUrl;
    var configuracionServiceFactory = {};

    var _getConfigurationByKey = function (key) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/Configuracion/GetConfigurationByKey?key=' + key)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _updateConfiguration = function (configuracion) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(serviceBase + '/api/Configuracion/UpdateConfiguration', configuracion)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    configuracionServiceFactory.getConfigurationByKey = _getConfigurationByKey;
    configuracionServiceFactory.updateConfiguration = _updateConfiguration;

    return configuracionServiceFactory;
}]);