(function () {
    'use strict';

    angular
        .module(appName)
        .factory('requestsDataService', ['$http', 'common', 'appConfig', 'authenticationService', requestsDataService]);

    function requestsDataService($http, common, appConfig, authenticationService) {

        //#region Members

        var factory = {
            getRequestDetail: getRequestDetail,
            getRequestDocumentDownloadUrl: getRequestDocumentDownloadUrl,
            getBeneficiaryDocumentDownloadUrl: getBeneficiaryDocumentDownloadUrl,
            getRequestNextStatus: getRequestNextStatus,
            updateRequestDocumentValidation: updateRequestDocumentValidation,
            updateBeneficiaryDocumentValidation: updateBeneficiaryDocumentValidation,
            updateRequestStatus: updateRequestStatus
        };

        return factory;

        //#endregion

        //#region Fields

        //#endregion

        //#region Methods

        function getRequestDetail(requestId) {
            var url = appConfig.webApiBaseUrl + '/api/Administrator/Requests/{0}'.format(requestId);
            var accessToken = authenticationService.getAccessToken();

            return $http.get(url, {
                headers: {
                    'Content-Type': JSON_CONTENT_TYPE,
                    'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                }
            });
        }

        function getRequestDocumentDownloadUrl(requestId, documentType) {
            var url = appConfig.webApiBaseUrl + '/api/Entitle/Requests/{0}/Documents/{1}'.format(requestId, documentType);

            return url;
        }

        function getBeneficiaryDocumentDownloadUrl(requestId, beneficiaryId, documentType) {
            var url = appConfig.webApiBaseUrl + '/api/Entitle/Requests/{0}/Beneficiaries/{1}/Documents/{2}'.format(requestId, beneficiaryId, documentType);

            return url;
        }

        function getRequestNextStatus(requestId) {
            var url = appConfig.webApiBaseUrl + '/api/Administrator/Requests/{0}/NextStatus'.format(requestId);
            var accessToken = authenticationService.getAccessToken();

            return $http.get(url, {
                headers: {
                    'Content-Type': JSON_CONTENT_TYPE,
                    'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                }
            });
        }

        function updateRequestDocumentValidation(requestId, documentType, isValid, observations) {
            var url = appConfig.webApiBaseUrl + '/api/Administrator/Requests/{0}/Documents/{1}'.format(requestId, documentType);
            var accessToken = authenticationService.getAccessToken();

            return $http.put(url,
                {
                    IsValid: isValid,
                    Comment: observations
                }, {
                    headers: {
                        'Content-Type': JSON_CONTENT_TYPE,
                        'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                    }
                });
        }

        function updateBeneficiaryDocumentValidation(requestId, beneficiarId, documentType, isValid, observations) {
            var url = appConfig.webApiBaseUrl + '/api/Administrator/Requests/{0}/Beneficiaries/{1}/Documents/{2}'.format(requestId, beneficiarId, documentType);
            var accessToken = authenticationService.getAccessToken();

            return $http.put(url,
                {
                    IsValid: isValid,
                    Comment: observations
                }, {
                    headers: {
                        'Content-Type': JSON_CONTENT_TYPE,
                        'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                    }
                });
        }

        function updateRequestStatus(requestId, newStatus, observations) {
            var url = appConfig.webApiBaseUrl + '/api/Administrator/Requests/{0}/Status'.format(requestId);
            var accessToken = authenticationService.getAccessToken();

            return $http.put(url,
                {
                    NewStatusId: newStatus,
                    Observations: observations
                }, {
                    headers: {
                        'Content-Type': JSON_CONTENT_TYPE,
                        'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                    }
                });
        }

        //#endregion

    }
})();