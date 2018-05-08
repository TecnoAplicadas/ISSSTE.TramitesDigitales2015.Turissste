(function(){
    'use strict';

    angular
        .module(appName)
        .factory('searchQuoteDataService', ['$http', 'common', 'appConfig', 'authenticationService', searchQuoteDataService]);

    function searchQuoteDataService($http, common, appConfig, authenticationService) {
        var factory = {
            getQuotesByEntitle: getQuotesByEntitle,
            getQuotesByCurp: getQuotesByCurp,
            getQuoteByFolio: getQuoteByFolio,
            getReportDownload: getReportDownload,
            markAsAcquired: markAsAcquired
        };

        return factory;

        function getQuotesByEntitle(noIssste,pageSize,page) {
            var url = common.getBaseUrl() + 'api/Administrator/Quotes/{0}/Entitle?pageSize={1}&page={2}'.format(noIssste, pageSize, page);
            var accessToken = authenticationService.getAccessToken();

            return $http.get(url,
                {
                    headers: {
                        'Content-Type': JSON_CONTENT_TYPE,
                        'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                    }
                });
        }

        function getQuotesByCurp(curp, pageSize, page) {
            var url = common.getBaseUrl() + 'api/Administrator/Quotes/{0}/Curp?pageSize={1}&page={2}'.format(curp, pageSize, page);
            var accessToken = authenticationService.getAccessToken();

            return $http.get(url,
                {
                    headers: {
                        'Content-Type': JSON_CONTENT_TYPE,
                        'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                    }
                });
        }

        function getQuoteByFolio(folio) {
            var url = common.getBaseUrl() + 'api/Administrator/Quotes/{0}/Folio'.format(folio);
            var accessToken = authenticationService.getAccessToken();

            return $http.get(url,
                {
                    headers: {
                        'Content-Type': JSON_CONTENT_TYPE,
                        'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                    }
                });
        }

        function getReportDownload(quotationId) {
            var url = common.getBaseUrl() + 'api/Entitle/Report/' + quotationId;

            return url;

        }

        function markAsAcquired(quotationId, itWasAcquired) {
            var url = common.getBaseUrl() + 'api/Administrator/Quotes/{0}/Acquired/{1}'.format(quotationId, itWasAcquired);
            var accessToken = authenticationService.getAccessToken();

            return $http.get(url,
                {
                    headers: {
                        'Content-Type': JSON_CONTENT_TYPE,
                        'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                    }
                });
        }
    }


})();