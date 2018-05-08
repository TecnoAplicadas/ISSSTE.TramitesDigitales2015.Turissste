'use strict';
angular.module(appName).factory('PaquetesTuristicosServiceFactory', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

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

    var _getPaqueteTuristicoPorDerechohabiente = function (derechohabiente) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(serviceBase + '/api/PaquetesTuristicos/GetPaqueteTuristicoPorDerechohabiente', derechohabiente)
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

    var _existsPaquetePromocional = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/PaquetesTuristicos/ExistsPaquetePromocional')
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
    paquetesTuristicosServiceFactory.existsPaquetePromocional = _existsPaquetePromocional;

    return paquetesTuristicosServiceFactory;
}]);