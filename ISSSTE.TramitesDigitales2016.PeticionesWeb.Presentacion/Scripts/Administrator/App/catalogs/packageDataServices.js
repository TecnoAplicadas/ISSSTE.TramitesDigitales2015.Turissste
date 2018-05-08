(function(){
    'use strict';

    angular
        .module(appName)
        .factory('packageDataService', ['$http', 'common', 'appConfig', 'authenticationService', packageDataService]);

    function packageDataService($http, common, appConfig, authenticationService) {

        var factory = {
            getPackages: getPackages,
            createPackage: createPackage,
            updatePackage: updatePackage
        };

        return factory;

        function getPackages() {            
            var url = common.getBaseUrl() + 'api/Administrator/Packages';
            var accessToken = authenticationService.getAccessToken();

            return $http.get(url,
                {
                    headers: {
                        'Content-Type': JSON_CONTENT_TYPE,
                        'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                    }
                });
        }

        function createPackage(packageInfo) {
            var url = common.getBaseUrl() + 'api/Administrator/Packages/Create';
            var accessToken = authenticationService.getAccessToken();

            return $http.post(url,
                              packageInfo,
                              {
                                  headers: {
                                      'Content-Type': JSON_CONTENT_TYPE,
                                      'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                                  }
                              }
            );
        }

        function updatePackage(packageInfo) {
            var url = common.getBaseUrl() + 'api/Administrator/Packages/Update';
            var accessToken = authenticationService.getAccessToken();

            return $http.post(url,
                              packageInfo,
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