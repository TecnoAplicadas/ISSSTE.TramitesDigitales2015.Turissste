'use strict';
app.factory('TemporadasServiceFactory', ['$http', '$q', '$rootScope', 'AuthenticationService', function ($http, $q, $rootScope, AuthenticationService) {

    var serviceBase = $rootScope.baseUrl;
    var temporadasServiceFactory = {};

    var _getTemporadas = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/Temporadas/GetTemporadas')
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    temporadasServiceFactory.getTemporadas = _getTemporadas;

    return temporadasServiceFactory;
}]);