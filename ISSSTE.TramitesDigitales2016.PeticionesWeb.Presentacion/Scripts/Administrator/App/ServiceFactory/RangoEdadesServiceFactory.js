'use strict';
angular.module(appName).factory('RangoEdadesServiceFactory', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

    var serviceBase = $rootScope.baseUrl;
    var rangoEdadesServiceFactory = {};

    var _getRangosEdades = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/RangoEdades/GetRangosEdades')
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    rangoEdadesServiceFactory.getRangosEdades = _getRangosEdades;

    return rangoEdadesServiceFactory;
}]);