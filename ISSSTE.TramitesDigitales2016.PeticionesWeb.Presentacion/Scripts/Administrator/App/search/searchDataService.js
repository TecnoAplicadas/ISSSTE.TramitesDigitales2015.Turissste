(function () {
    'use strict';

    angular
        .module(appName)
        .factory('searchDataService', ['$http', 'common', 'appConfig', 'authenticationService', searchDataService]);

    function searchDataService($http, common, appConfig, authenticationService) {

        //#region Members

        var factory = {
            getStatusList: getStatusList,
            getRequests: getRequests
        };

        return factory;

        //#endregion 

        //#region Fields

        //#endregion

        //#region Methods

        function getStatusList() {
            var url = appConfig.webApiBaseUrl + '/api/Administrator/Status';
            var accessToken = authenticationService.getAccessToken()

            return $http.get(url, {
                headers: {
                    'Content-Type': JSON_CONTENT_TYPE,
                    'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                }
            });
        }

        function getRequests(pageSize, page, query, statusId) {
            var url = appConfig.webApiBaseUrl + '/api/Administrator/Requests?pageSize={0}&page={1}&query={2}&statusId={3}'.format(pageSize, page, query, statusId);
            var accessToken = authenticationService.getAccessToken()

            return $http.get(url, {
                headers: {
                    'Content-Type': JSON_CONTENT_TYPE,
                    'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                }
            });
        }

        //#endregion
    }
})();