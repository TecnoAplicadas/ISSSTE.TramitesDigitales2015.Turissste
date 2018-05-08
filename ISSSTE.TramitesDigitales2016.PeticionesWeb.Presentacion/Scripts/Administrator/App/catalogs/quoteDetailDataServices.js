(function () {
    'use strict';

    angular
        .module(appName)
        .factory('quoteDetailDataServices', ['$http', 'common', 'appConfig', 'authenticationService', quoteDetailDataServices]);

    function quoteDetailDataServices($http, common, appConfig, authenticationService) {

        var factory = {
            getQuote: getQuote,
            getReportDownload: getReportDownload
        };

        return factory;

        function getQuote(quotationId) {
            var url = common.getBaseUrl() + 'api/Administrator/Quotes/{0}'.format(quotationId);
            var accessToken = authenticationService.getAccessToken();

            return $http.get(url, {
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

    }
})();