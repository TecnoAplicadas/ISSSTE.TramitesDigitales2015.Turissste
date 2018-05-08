(function () {
    'use strict';

    angular
        .module(appName)
        .factory('indicatorsDataService', ['$http', 'common', 'authenticationService', indicatorsDataService]);

    function indicatorsDataService($http, common, authenticationService) {

        //#region Members

        var factory = {
            getDelegations: getDelegations,
            generateReportDownloadUrl: generateReportDownloadUrl
        };

        return factory;

        //#endregion

        //#region Fields

        //#endregion

        //#region Methods

        function getDelegations() {
            var url = common.getBaseUrl() + 'api/Administrator/Delegations';
            var accessToken = authenticationService.getAccessToken()

            return $http.get(url, {
                headers: {
                    'Content-Type': JSON_CONTENT_TYPE,
                    'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                }
            });
        }

        function generateReportDownloadUrl(formatId, delegationId, startDate, endDate) {
            var url = common.getBaseUrl() + 'Administrator/Indicators/Report?reportFormat={0}&delegationId={1}&startDate={2}&endDate={3}'.format(formatId, delegationId, startDate, endDate);

            return url;
        }

        //#endregion
    }
})();