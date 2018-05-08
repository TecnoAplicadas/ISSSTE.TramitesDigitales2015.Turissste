'use strict';
app.factory('EncuestaServiceFactory', ['$http', '$q', '$rootScope', 'AuthenticationService', function ($http, $q, $rootScope, AuthenticationService) {

    var serviceBase = $rootScope.baseUrl;
    var encuestaServiceFactory = {};

    var _encuestaExist = function (idDerechohabiente) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/Encuesta/EncuestaExist?idDerechohabiente=' + idDerechohabiente)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _addEncuesta = function (encuesta) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(serviceBase + '/api/Encuesta/AddEncuesta', encuesta)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    encuestaServiceFactory.encuestaExist = _encuestaExist;
    encuestaServiceFactory.addEncuesta = _addEncuesta;

    return encuestaServiceFactory;
}]);