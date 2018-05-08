'use strict';
app.factory('DerechohabienteServiceFactory', ['$http', '$q', '$rootScope', 'localStorageService', function ($http, $q, $rootScope, localStorageService) {

    var serviceBase = $rootScope.baseUrl;
    var derechohabienteServiceFactory = {};

    var _currentUser = {};

    var _getDerechohabienteService = function (noIssste) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/Derechohabiente/GetDerechohabienteService?noIssste=' + noIssste)
            .then(function (result) {
                defered.resolve(result);

                if (result.data.Result === 1) {
                    localStorageService.set('currentUser', {
                        User: result.data.Data
                    });
                }
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _addDerechohabiente = function (derechohabiente) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(serviceBase + '/api/Derechohabiente/AddDerechohabiente', derechohabiente)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _getDerechohabienteByNoIssste = function (noIssste) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/Derechohabiente/GetDerechohabienteByNoIssste?noIssste=' + noIssste)
            .then(function (result) {
                defered.resolve(result);

                if (result.data.Result === 1) {
                    localStorageService.set('currentUser', {
                        User: result.data.Data
                    });
                }
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _getDerechohabienteById = function (idDerechohabiente) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/Derechohabiente/GetDerechohabienteById?idDerechohabiente=' + idDerechohabiente)
            .then(function (data) {
                defered.resolve(data);

                if (result.data.Result === 1) {
                    localStorageService.set('currentUser', {
                        User: result.data.Data
                    });
                }
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _updateDatosContactoDerechohabiente = function (derechohabiente) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(serviceBase + '/api/Derechohabiente/UpdateDatosContactoDerechohabiente', derechohabiente)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    derechohabienteServiceFactory.getDerechohabienteService = _getDerechohabienteService;
    derechohabienteServiceFactory.addDerechohabiente = _addDerechohabiente;
    derechohabienteServiceFactory.getDerechohabienteByNoIssste = _getDerechohabienteByNoIssste;
    derechohabienteServiceFactory.getDerechohabienteById = _getDerechohabienteById;
    derechohabienteServiceFactory.updateDatosContactoDerechohabiente = _updateDatosContactoDerechohabiente;
    derechohabienteServiceFactory.currentUser = _currentUser;

    return derechohabienteServiceFactory;
}]);