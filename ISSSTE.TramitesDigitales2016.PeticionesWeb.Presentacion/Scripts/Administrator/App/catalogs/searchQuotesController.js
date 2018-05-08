(function(){
    'use strict';

    var controllerId = 'searchQuotesController';
    angular
        .module(appName)
        .controller(controllerId, ['$routeParams', '$location', 'common', 'searchQuoteDataService', 'webApiService', searchQuotesController]);

    function searchQuotesController($routeParams, $location, common, searchQuoteDataService, webApiService) {

        var vm = this;

        var MAX_PAGES = 11;

        var paginationHelper = new PaginationHelper(MAX_PAGES);

        vm.getQuotes = getQuotes;
        vm.setCriterion = setCriterion;
        vm.searchQuotes = searchQuotes;
        vm.getReview = getReview;
        vm.getReport = getReport;
        vm.reportUrl;
        vm.init = init;
        vm.markAsAcquired = markAsAcquired;


        vm.filter = '';
        vm.selectedCriterion = '';
        vm.placeholder = '';
        vm.pattern = '';
        vm.criteria = {
            entitle: { 
                value:'noIssste', 
                placeholder: 'Buscar por número de ISSSTE', 
                pattern: '^[0-9]{1,7}$'
            },
            curp: {
                value: 'curp',
                placeholder: 'Buscar por CURP',
                pattern: '^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$'
            },
            folio: {
                value: 'folio',
                placeholder: 'Buscar por Folio',
                pattern: '^VYC[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{15}$'
            }
        };
        vm.quotes = [];
        vm.withoutRecords = false;

        vm.isPageSelected = isPageSelected;
        vm.isFirstPage = isFirstPage;
        vm.isLasPage = isLasPage;
        vm.changeSelectedPage = changeSelectedPage;
        vm.changeToPreviousPage = changeToPreviousPage;
        vm.changeToNextPage = changeToNextPage;
        vm.pageSizes = [
            10, 20, 30, 40
        ];
        vm.selectedPageSize = vm.pageSizes[0];
        vm.pages = [1];
        vm.totalPages = 1;
        vm.selectedPage = 1;

        function init() {
            if (common.config.quoteInformation.idQuote != null && common.config.quoteInformation.idQuote != undefined) {
                vm.filter = common.config.quoteInformation.filter;
                vm.selectedCriterion = common.config.quoteInformation.criterion;                

                if (common.config.quoteInformation.page != 1)
                    changeSelectedPage(common.config.quoteInformation.page)
                else
                    searchQuotes();
            }
            else {
                vm.selectedCriterion = vm.criteria.entitle.value;
                vm.setCriterion(vm.criteria.entitle);
                common.hideLoadingScreen();
            }                        
        }

        function getQuotes() {
            var promise = null;
            var filter = vm.filter.toUpperCase();

            if (vm.selectedCriterion == vm.criteria.entitle.value)
                promise = getQuotesByEntitle(filter);
            else if (vm.selectedCriterion == vm.criteria.curp.value)
                promise = getQuotesByCurp(filter);
            else
                promise = getQuoteByFolio(filter);
            
            return promise;
        }

        function searchQuotes() {
            var promise = null;

            common.displayLoadingScreen();

            promise = getQuotes();

            promise.finally(function () {

                common.hideLoadingScreen();
            });
        }


        function getQuotesByEntitle(noIssste) {
            var promise = null;

            

            promise = webApiService.makeRetryRequest(1, function () {
                return searchQuoteDataService.getQuotesByEntitle(noIssste,vm.selectedPageSize, vm.selectedPage);
            });

            promise.then(function (data) {
                vm.selectedPage = data.CurrentPage;
                vm.totalPages = data.TotalPages;

                vm.pages = paginationHelper.getPages(vm.selectedPage, vm.totalPages);

                vm.quotes = data.Quotations;
                vm.withoutRecords = vm.quotes.length == 0;
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.gettingQuotes);
            });

            

            return promise;

            
        }

        function getQuotesByCurp(curp) {
            var promise = null;            

            promise = webApiService.makeRetryRequest(1, function () {
                return searchQuoteDataService.getQuotesByCurp(curp, vm.selectedPageSize, vm.selectedPage);
            });

            promise.then(function (data) {
                vm.selectedPage = data.CurrentPage;
                vm.totalPages = data.TotalPages;

                vm.pages = paginationHelper.getPages(vm.selectedPage, vm.totalPages);

                vm.quotes = data.Quotations;
                vm.withoutRecords = vm.quotes.length == 0;
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.gettingQuotes);
            });

            return promise;
        }

        function getQuoteByFolio(folio) {
            var promise = null;            

            promise = webApiService.makeRetryRequest(1, function () {
                return searchQuoteDataService.getQuoteByFolio(folio);
            });

            promise.then(function (data) {
                vm.quotes = data;
                vm.withoutRecords = vm.quotes.length == 0;
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.gettingQuotes);
            });

            return promise;
        }

        function setCriterion(criterion) {
            vm.placeholder = criterion.placeholder;
            vm.pattern = criterion.pattern;
            vm.filter = '';
        }


        function isPageSelected(page) {
            return page == vm.selectedPage;
        }

        function isFirstPage() {
            return vm.selectedPage == 1;
        }

        function isLasPage() {
            return vm.selectedPage == vm.totalPages;
        }

        function changeSelectedPage(page) {
            if (!isPageSelected(page)) {
                vm.selectedPage = page;

                vm.searchQuotes();
            }
        }

        function changeToPreviousPage() {
            if (!vm.isFirstPage())
                changeSelectedPage(vm.selectedPage - 1);
        }

        function changeToNextPage() {
            if (!isLasPage())
                changeSelectedPage(vm.selectedPage + 1);
        }

        function getReview(idQuote, navigate) {
            common.config.quoteInformation.idQuote = idQuote;
            common.config.quoteInformation.filter = vm.filter;
            common.config.quoteInformation.criterion = vm.selectedCriterion;
            common.config.quoteInformation.page = vm.selectedPage;
            navigate();
        }

        function getReport(quotationId) {
            vm.reportUrl = searchQuoteDataService.getReportDownload(quotationId);
        }


        function markAsAcquired(quote) {
            var promise = null;

            common.displayLoadingScreen();

            promise = webApiService.makeRetryRequest(1, function () {
                return searchQuoteDataService.markAsAcquired(quote.QuotationId, quote.Acquired);
            });

            promise.then(function (data) {
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.markingAsAcquired);
            });

            promise.finally(function () {
                common.hideLoadingScreen();
            });
        }
    }


})();