'use strict';
angular.module(appName).factory('GeneroServiceFactory', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

    var serviceBase = $rootScope.baseUrl;
    var generoServiceFactory = {};

    var _getGeneros = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/Genero/GetGeneros')
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    generoServiceFactory.getGeneros = _getGeneros;

    return generoServiceFactory;
}]);