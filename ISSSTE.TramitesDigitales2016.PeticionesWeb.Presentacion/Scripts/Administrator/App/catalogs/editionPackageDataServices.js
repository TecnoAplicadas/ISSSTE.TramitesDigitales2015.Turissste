(function(){
    'use strict';

    angular
        .module(appName)
        .factory('editionPackageDataService', ['$http', 'common', 'appConfig', 'authenticationService', editionPackageDataService]);

    function editionPackageDataService($http, common, appConfig, authenticationService) {

        var factory = {
            getTypesProduct: getTypesProduct,
            addTypeProductToPackage: addTypeProductToPackage,
            removeTypeProductFromPackage: removeTypeProductFromPackage
        };

        return factory;

        function getTypesProduct(packageId) {
            var url = common.getBaseUrl() + 'api/Administrator/ProductTypes/' + packageId;
            var accessToken = authenticationService.getAccessToken();

            return $http.get(url,
                {
                    headers: {
                        'Content-Type': JSON_CONTENT_TYPE,
                        'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                    }
                });
        }

        function addTypeProductToPackage(typeProduct) {
            var url = common.getBaseUrl() + 'api/Administrator/Package/Add/ProducType';
            var accessToken = authenticationService.getAccessToken();

            return $http.post(url,
                              typeProduct,
                              {
                                  headers: {
                                      'Content-Type': JSON_CONTENT_TYPE,
                                      'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                                  }
                              }
            );
        }

        function removeTypeProductFromPackage(packageId, typeProductId) {
            var url = common.getBaseUrl() + 'api/Administrator/Package/' + packageId + '/ProducType/' + typeProductId +'/Delete';
            var accessToken = authenticationService.getAccessToken();

            return $http.delete(url,
                              {
                                  headers: {
                                      'Content-Type': JSON_CONTENT_TYPE,
                                      'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                                  }
                              }
            );

        }
    }


})();