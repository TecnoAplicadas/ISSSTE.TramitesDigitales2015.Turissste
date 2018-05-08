'use strict';
app.factory('PaquetesTuristicosServiceFactory', ['$http', '$q', '$rootScope', 'AuthenticationService', function ($http, $q, $rootScope, AuthenticationService) {

    var serviceBase = $rootScope.baseUrl;
    var paquetesTuristicosServiceFactory = {};

    var _getPaquetesTuristicos = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/PaquetesTuristicos/GetPaquetesTuristicos')
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _getPaqueteTuristicoPorDerechohabiente = function (idDerechohabiente) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/PaquetesTuristicos/GetPaqueteTuristicoPorDerechohabiente?idDerechohabiente=' + idDerechohabiente)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _getPaqueteTuristicoPromocionado = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/PaquetesTuristicos/GetPaqueteTuristicoPromocionado')
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _addPaqueteTuristico = function (paqueteTuristico) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(serviceBase + '/api/PaquetesTuristicos/AddPaqueteTuristico', paqueteTuristico)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _updatePaqueteTuristico = function (paqueteTuristico) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.put(serviceBase + '/api/PaquetesTuristicos/UpdatePaqueteTuristico', paqueteTuristico)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    paquetesTuristicosServiceFactory.getPaquetesTuristicos = _getPaquetesTuristicos;
    paquetesTuristicosServiceFactory.getPaqueteTuristicoPorDerechohabiente = _getPaqueteTuristicoPorDerechohabiente;
    paquetesTuristicosServiceFactory.getPaqueteTuristicoPromocionado = _getPaqueteTuristicoPromocionado;
    paquetesTuristicosServiceFactory.addPaqueteTuristico = _addPaqueteTuristico;
    paquetesTuristicosServiceFactory.updatePaqueteTuristico = _updatePaqueteTuristico;

    return paquetesTuristicosServiceFactory;
}]);