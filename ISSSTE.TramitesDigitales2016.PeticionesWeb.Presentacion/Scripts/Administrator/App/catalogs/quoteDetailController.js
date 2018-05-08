(function () {
    'use strict';

    var controllerId = 'quoteDetailController';
    angular
        .module(appName)
        .controller(controllerId, ['common', 'quoteDetailDataServices', 'webApiService', quoteDetailController]);


    function quoteDetailController(common, quoteDetailDataServices, webApiService) {

        //#region Controller Members

        var vm = this;
        vm.quote = {};
        vm.idQuote;
        vm.getReport = getReport;
        vm.reportUrl;

        vm.initQuote = initQuote;

        //#endregion

        //#region Functions

        function initQuote() {
            vm.idQuote = common.config.quoteInformation.idQuote;
            getQuote();
            completeControllerInit();
        }

        function getQuote() {
           
            var dataPromise = null;                

            dataPromise = webApiService.makeRetryRequest(1, function () {
                return quoteDetailDataServices.getQuote(vm.idQuote);
            });

            dataPromise.then(function (data) {
                vm.quote = data;
            });

            dataPromise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.gettingQuote);
            });
        }        


        function completeControllerInit() {
            common.logger.log(Messages.info.contollerLoaded, null, controllerId);
            common.activateController([], controllerId);
        }

        function getReport(idQuote) {
            vm.reportUrl = quoteDetailDataServices.getReportDownload(idQuote);
        }

        //#endregion
    }
})();