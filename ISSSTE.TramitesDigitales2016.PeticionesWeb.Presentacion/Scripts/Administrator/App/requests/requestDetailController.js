(function () {
    'use strict';

    var controllerId = 'requestDetailController';
    angular
        .module(appName)
        .controller(controllerId, ['$routeParams', '$location', 'common', 'requestsDataService', 'webApiService', requestDetailController]);


    function requestDetailController($routeParams, $location, common, requestsDataService, webApiService) {
        //#region Controller Members

        var vm = this;

        vm.error = false;
        vm.requestInfo = null;
        vm.nextStatus = [];
        vm.selectedNextStatus = null;
        vm.nextStatusObservations = null;

        vm.init = init;
        vm.initRequest = initRequest;
        vm.setSelectedNextStatus = setSelectedNextStatus;
        vm.completeRequestReview = completeRequestReview;

        //#endregion

        //#region Functions

        function init() {
            common.logger.log(Messages.info.controllerLoaded, null, controllerId);
            common.activateController([], controllerId);
        }

        function initRequest() {
            var initPromises = [];

            var requestId = $routeParams[REQUEST_ID_PARAM];

            if (requestId) {
                initPromises.push(getRequestDetail(requestId));
                initPromises.push(getRequestNextStatus(requestId));
            }

            common.$q.all(initPromises)
                .finally(function () {
                    init();
                })
        }

        function setSelectedNextStatus(status) {
            vm.selectedNextStatus = status;
        }

        function completeRequestReview() {
            if (isRequestReviewed()) {
                updateRequest();
            }
        }

        //#endregion

        //#region Helper Functions

        function getRequestDetail(requestId) {
            return webApiService.makeRetryRequest(1, function () {
                return requestsDataService.getRequestDetail(requestId)
            })
                .then(function (data) {
                    vm.requestInfo = data

                    initDocuments(requestId)
                })
                .catch(function (reason) {
                    common.showErrorMessage(reason, Messages.error.requestDetail);
                    vm.error = true;
                });
        }

        function initDocuments(requestId) {
            vm.requestInfo.RequestDocuments.forEach(function (actualDocument, index) {
                actualDocument.DownloadUrl = requestsDataService.getRequestDocumentDownloadUrl(requestId, actualDocument.DocumentTypeId);
            });

            vm.requestInfo.Beneficiaries.forEach(function (actualBeneficiary, index) {
                actualBeneficiary.BeneficiaryDocuments.forEach(function (actualDocument) {
                    actualDocument.DownloadUrl = requestsDataService.getBeneficiaryDocumentDownloadUrl(requestId, actualBeneficiary.BeneficiaryId, actualDocument.DocumentTypeId);
                });
            });
        }

        function getRequestNextStatus(requestId) {
            return webApiService.makeRetryRequest(1, function () {
                return requestsDataService.getRequestNextStatus(requestId)
            })
                .then(function (data) {
                    vm.nextStatus = data;
                })
                .catch(function (reason) {
                    common.showErrorMessage(reason, Messages.error.nextStatus);
                    vm.error = true;
                });
        }

        function isRequestReviewed() {
            var result = true;

            if (vm.requestInfo == null)
                result = false;
            else {
                var isValid = true;
                var message = "";

                vm.requestInfo.RequestDocuments.forEach(function (actualDocument, index) {
                    if (actualDocument.IsValid == null) {
                        result = false;
                        isValid = false;
                    }
                });

                if (!isValid) {
                    message += Messages.error.holderDocumentsNotReviewed;
                    isValid = true;
                }

                vm.requestInfo.Beneficiaries.forEach(function (actualBeneficiary, index) {
                    actualBeneficiary.BeneficiaryDocuments.forEach(function (actualDocument) {
                        if (actualDocument.IsValid == null) {
                            result = false;
                            isValid = false;
                        }
                    });

                    if (!isValid) {
                        message += "\n" + Messages.error.beneficiaryDocumentsNotReviewed.format(index + 1);
                        isValid = true;
                    }
                });

                if (vm.selectedNextStatus == null) {
                    result = false;
                    message += "\n" + Messages.error.nextStatusNotSelected;
                }

                if (message != "")
                    common.showErrorMessage(message, Messages.error.requestNotReviewd);
            }


            return result;
        }

        function updateRequest() {
            var promises = [];

            common.displayLoadingScreen();

            vm.requestInfo.RequestDocuments.forEach(function (actualDocument, index) {
                promises.push(
                    webApiService.makeRetryRequest(1, function () {
                        return requestsDataService.updateRequestDocumentValidation(vm.requestInfo.RequestId, actualDocument.DocumentTypeId, actualDocument.IsValid, actualDocument.Observations);
                    })
                );
            });

            vm.requestInfo.Beneficiaries.forEach(function (actualBeneficiary, index) {
                actualBeneficiary.BeneficiaryDocuments.forEach(function (actualDocument) {
                    promises.push(
                        webApiService.makeRetryRequest(1, function () {
                            return requestsDataService.updateBeneficiaryDocumentValidation(vm.requestInfo.RequestId, actualBeneficiary.BeneficiaryId, actualDocument.DocumentTypeId, actualDocument.IsValid, actualDocument.Observations);
                        })
                    );
                });
            });

            common.$q.all(promises)
                .then(function () {
                    webApiService.makeRetryRequest(1, function () {
                        return requestsDataService.updateRequestStatus(vm.requestInfo.RequestId, vm.selectedNextStatus.StatusId, vm.nextStatusObservations);
                    })
                        .then(function (data) {
                            $location.path(Routes.search.url);
                        })
                        .catch(function (reason) {
                            common.showErrorMessage(reason, Messages.error.updateRequest);
                            common.hideLoadingScreen();
                        });
                })
                .catch(function (reason) {
                    common.showErrorMessage(reason, Messages.error.validateDocuments);
                    common.hideLoadingScreen();
                })
        }

        //#endregion
    }
})
();