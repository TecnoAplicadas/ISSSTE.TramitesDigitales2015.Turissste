'use strict';
app.factory('MotivosViajeServiceFactory', ['$http', '$q', '$rootScope', 'AuthenticationService', function ($http, $q, $rootScope, AuthenticationService) {

    var serviceBase = $rootScope.baseUrl;
    var motivosViajeServiceFactory = {};

    var _getMotivosViaje = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + '/api/MotivosViaje/GetMotivosViaje')
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    motivosViajeServiceFactory.getMotivosViaje = _getMotivosViaje;

    return motivosViajeServiceFactory;
}]);