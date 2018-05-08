'use strict';
app.service('AuthenticationService', ['$http', 'CommonServiceFactory', 'appConfig', 'localStorageService', function ($http, CommonServiceFactory, appConfig, localStorageService) {

    var authenticationService = {};

    //#region Properties

    var _getAuthorizationData = function () {
        return localStorageService.get(appConfig.authorizationDataLocalStorageKey);
    };

    //function getAuthorizationData() {
    //    return localStorageService.get(appConfig.authorizationDataLocalStorageKey);
    //}

    var _getAccessToken = function () {
        return _getAuthorizationData() === null ? null : _getAuthorizationData().access_token;
    };

    //function getAccessToken() {
    //    return getAuthorizationData() === null ? null : getAuthorizationData().access_token;
    //}

    //#nedregion

    function login(clientId, userName) {

        var deferred = CommonServiceFactory.$q.defer();

        var data = BEARER_TOKEN_DATA_TEMPLATE.format(userName, clientId);

        $http.post(CommonServiceFactory.getBaseUrl() + "token", data, {
            headers: {
                "Content-Type": FORM_CONTENT_TYPE
            },
            timeout: AUTHENTICATION_TIMEOUT
        })
            .success(function (data, status, headers, config) {
                localStorageService.set(appConfig.authorizationDataLocalStorageKey, data);

                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                vm.clearToken();

                //TODO: Validar procesamiento de errores
                if (data.error_description !== undefined)
                    deferred.reject(data.error_description);
                else if (data.Message !== undefined)
                    deferred.reject(data.Message);
                else
                    deferred.reject("Ocurrio un error");
            });

        return deferred.promise;
    }

    function clearToken() {
        localStorageService.remove(appConfig.authorizationDataLocalStorageKey);
    }

    function validateToken() {

        var url = common.getBaseUrl() + 'api/Administrator/Token/Validate';
        var accessToken = _getAccessToken();

        return $http.get(url, {
            headers: {
                'Content-Type': JSON_CONTENT_TYPE,
                'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
            }
        });

    }

    function getUserRoles() {

        var url = common.getBaseUrl() + 'api/Administrator/User/Roles';
        var accessToken = _getAccessToken();

        return $http.get(url, {
            headers: {
                'Content-Type': JSON_CONTENT_TYPE,
                'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
            }
        });
    }

    authenticationService.getAccessToken = _getAccessToken;
    authenticationService.getAuthorizationData = _getAuthorizationData;

    return authenticationService;
}]);