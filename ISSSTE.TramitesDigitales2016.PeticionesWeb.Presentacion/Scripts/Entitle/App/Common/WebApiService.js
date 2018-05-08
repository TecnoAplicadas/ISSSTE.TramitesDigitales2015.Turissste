'use strict';
app.service('WebApiService', ['$window', '$http', 'AuthenticationService','$q', function ($window, $http, AuthenticationService, $q) {

    var webApiService = {};

    var _makeRetryRequest = function (retryLimit, bodyToRetry) {
        var defer = $q.defer();
        //var promise = defered.promise;

        bodyToRetry()
            .success(function (result) {
                defer.resolve(result);
            })
            .error(function (error, status) {
                if (status === 401) {
                    var authData = AuthenticationService.getAuthorizationData();

                    if (authData !== undefined) {
                        AuthenticationService.login(authData.client_id, authData.user_name)
                            .then(function () {
                                makeRetryRequestCount(bodyToRetry, retryLimit, 1)
                                    .then(function (data) {
                                        defer.resolve(data);
                                    })
                                    .catch(function (reason) {
                                        defer.reject(reason);
                                    });
                            }).catch(function (reason) {
                                defer.reject(reason);

                                //$window.location.href = common.getBaseUrl() + Constants.accountRoutes.softLogout.format(encodeURIComponent($window.location.href));
                            });
                    } else {
                        //$window.location.href = common.getBaseUrl() + Constants.accountRoutes.logout.format(encodeURIComponent($window.location.href));
                    }
                } else {
                    defer.reject(error);
                }
            });

        return defer.promise;
    };

    //function makeRetryRequest(retryLimit, bodyToRetry) {
    //    //var defer = common.$q.defer();

    //    var defer = $q.defer();
    //    //var promise = defered.promise;

    //    bodyToRetry()
    //        .success(function (result) {
    //            defer.resolve(result);
    //        })
    //        .error(function (error, status) {
    //            if (status === 401) {
    //                var authData = AuthenticationService.getAuthorizationData();

    //                if (authData !== undefined) {
    //                    AuthenticationService.login(authData.client_id, authData.user_name)
    //                        .then(function () {
    //                            makeRetryRequestCount(bodyToRetry, retryLimit, 1)
    //                                .then(function (data) {
    //                                    defer.resolve(data);
    //                                })
    //                                .catch(function (reason) {
    //                                    defer.reject(reason);
    //                                });
    //                        }).catch(function (reason) {
    //                            defer.reject(reason);

    //                            //$window.location.href = common.getBaseUrl() + Constants.accountRoutes.softLogout.format(encodeURIComponent($window.location.href));
    //                        });
    //                } else {
    //                    //$window.location.href = common.getBaseUrl() + Constants.accountRoutes.logout.format(encodeURIComponent($window.location.href));
    //                }
    //            } else {
    //                defer.reject(error);
    //            }
    //        });

    //    return defer.promise;
    //}

    function makeRetryRequestCount(bodyToRetry, retryLimit, retryCount) {        
        var defer = $q.defer();

        if (retryCount <= retryLimit) {
            bodyToRetry().success(function (result) {
                defer.resolve(result);
            }).error(function (err, status) {
                makeRetryRequestCount(bodyToRetry, retryLimit, retryCount + 1);

                if (retryCount === retryLimit - 1)
                    defer.reject({ err: err, status: status });
            });
        }

        return defer.promise;
    }

    webApiService.makeRetryRequest = _makeRetryRequest;
    webApiService.makeRetryRequestCount = makeRetryRequestCount;

    return webApiService;
}]);