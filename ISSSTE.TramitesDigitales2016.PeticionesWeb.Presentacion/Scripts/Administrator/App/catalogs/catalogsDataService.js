(function () {
    'use strict';

    angular
        .module(appName)
        .factory('catalogsDataService', ['$http', 'common', 'appConfig', 'authenticationService', catalogsDataService]);

    function catalogsDataService($http, common, appConfig, authenticationService) {

        //#region Members

        var factory = {
            getCatalogItems: getCatalogItems,
            getCatalogItemDetail: getCatalogItemDetail,
            addOrUpdateCatalogItem: addOrUpdateCatalogItem
        };

        return factory;

        //#endregion

        //#region Fields

        //#endregion

        //#region Methods

        function getCatalogItems(catalogName) {
            var url = appConfig.webApiBaseUrl + '/api/Administrator/Catalogs/{0}'.format(catalogName);
            var accessToken = authenticationService.getAccessToken();

            return $http.get(url, {
                headers: {
                    'Content-Type': JSON_CONTENT_TYPE,
                    'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                }
            });
        }

        function getCatalogItemDetail(catalogName, itemKey) {
            var url = appConfig.webApiBaseUrl + '/api/Administrator/Catalogs/{0}/{1}'.format(catalogName, itemKey);
            var accessToken = authenticationService.getAccessToken();

            return $http.get(url, {
                headers: {
                    'Content-Type': JSON_CONTENT_TYPE,
                    'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                }
            });
        }

        function addOrUpdateCatalogItem(catalogName, itemKey, itemData) {
            var url = appConfig.webApiBaseUrl + '/api/Administrator/Catalogs/{0}/{1}'.format(catalogName, itemKey);
            var accessToken = authenticationService.getAccessToken();

            return $http.post(url,
                itemData, {
                    headers: {
                        'Content-Type': JSON_CONTENT_TYPE,
                        'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                    }
                }
            );
        }

        //#endregion

    }
})();