(function () {
    'use strict';

    var controllerId = 'indicatorsController';

    angular
        .module(appName)
        .controller(controllerId, ['common', 'indicatorsDataService', 'webApiService', indicatorsController]);


    function indicatorsController(common, indicatorsDataService, webApiService) {
        //#region Controller Members

        var vm = this;

        vm.delegations = [];
        vm.reportFormats = R.values(Constants.reportFormats);
        vm.selectedDelegetaion = -1;
        vm.startDate = null;
        vm.endDate = null;
        vm.selectedFormat = vm.reportFormats[0];

        vm.init = init;
        vm.initDelegations = initDelegations;
        vm.getReportDownloadUrl = getReportDownloadUrl;

        //#endregion

        //#region Constants

        var STANDARD_DATE_FORMAT = "{0}/{1}/{2}";

        //#endregion

        //#region Functions

        function init() {
            common.logger.log(Messages.info.controllerLoaded, null, controllerId);
            common.activateController([], controllerId);
        }

        function initDelegations() {
            var initPromises = [];

            initPromises.push(getDelegations());

            common.$q.all(initPromises)
                .finally(function () {
                    init();
                });
        }

        function getReportDownloadUrl() {
            return indicatorsDataService.generateReportDownloadUrl(vm.selectedFormat.Id, vm.selectedDelegetaion.DelegationId, convertUniversalTimeFormatDate(vm.startDate), convertUniversalTimeFormatDate(vm.endDate));
        }

        //#endregion

        //#regio  Helper Methods

        function getDelegations() {
            return webApiService.makeRetryRequest(1, function () {
                return indicatorsDataService.getDelegations();
            })
                .then(function (data) {
                    vm.delegations = data;

                    vm.selectedDelegetaion = vm.delegations[0];
                })
                .catch(function (reason) {
                    common.showErrorMessage(reason, Messages.error.delegations);
                });
        }

        function convertUniversalTimeFormatDate(date) {
            var result = null;

            if (date) {
                var day = date.substring(0, 2);
                var month = date.substring(3, 5);
                var year = date.substring(6, 10);

                result = STANDARD_DATE_FORMAT.format(year, month, day);
            }

            return result;
        }

        //#endregion
    }
})();