(function () {
    'use strict';

    var controllerId = 'navigationController';

    angular
        .module(appName)
        .controller(controllerId, ['$rootScope', '$routeParams', '$location', 'common', 'appConfig', navigationController]);

    function navigationController($rootScope, $routeParams, $location, common, appConfig) {

        //#region Constants

        var REQUEST_ID_TEMPLATE_PARAM = ":" + REQUEST_ID_PARAM;
        var CATALOG_ITEM_KEY_TEMPLATE_PARAM = ":" + "catalogItemKey";

        //#endregion

        //#region Members

        var vm = this;

        vm.supportUrl = Routes.support.url;
        vm.indicatorsUrl = Routes.indicators.url;

        vm.isSupportSelected = false;
        vm.isQuotesQuerySelected = false;
        vm.isPackagesSelected = false;
        vm.isProductsSelected = false;
        vm.isIndicatorSelected = false;

        vm.getPackagesUrl = getPackagesUrl;
        vm.getDetailPackageUrl = getDetailPackageUrl;
        vm.getProductsUrl = getProductsUrl;        
        vm.getQuotesUrl = getQuotesUrl;
        vm.getQuoteDetail = getQuoteDetail;
        vm.getSupportUrl = getSupportUrl;

        vm.navigatePackagesUrl = navigatePackagesUrl;
        vm.navigateDetailPackageUrl = navigateDetailPackageUrl;
        vm.navigateProductsUrl = navigateProductsUrl;
        vm.navigateQuotes = navigateQuotes;
        vm.navigateQuoteDetail = navigateQuoteDetail;
        vm.navigateSupport = navigateSupport;

        vm.canUserAccessSupport = canUserAccessSupport;
        vm.canUserAccessQuotesQuery = canUserAccessQuotesQuery;
        vm.canUserAccessPackages = canUserAccessPackages;
        vm.canUserAccessProducts = canUserAccessProducts;
        vm.canUserAccessIndicators = canUserAccessIndicators;


        //#endregion

        //#region Initialization

        $rootScope.$on('$routeChangeSuccess',
            function (event, current, previous) {
                var currentRequestUrl = current.originalPath;

                if (currentRequestUrl === vm.supportUrl)
                    selectSupport();
                else if (currentRequestUrl === vm.getQuotesUrl() || currentRequestUrl === getQuoteDetail()) {
                    selectQuotesQuery();
                }
                else if (currentRequestUrl === vm.getPackagesUrl() || currentRequestUrl === getDetailPackageUrl()) {
                    selectPackages();
                }
                else if (currentRequestUrl === vm.getProductsUrl()) {
                    selectProducts();
                }
                else if (currentRequestUrl === vm.indicatorsUrl) {
                    selectIndicators();
                }
               
            });

        //#endregion

        //#region Functions

        function navigatePackagesUrl() {
            $location.path(Routes.packages.url);
        }

        function navigateDetailPackageUrl() {
            $location.path(Routes.editionPackages.url);
        }

        function navigateProductsUrl() {
            $location.path(Routes.products.url);
        }

        function navigateQuotes() {
            $location.path(Routes.quotes.url);
        }

        function navigateQuoteDetail() {
            $location.path(Routes.quoteDetail.url);
        }

        function navigateSupport() {
            $location.path(Routes.support.url);
        }

        function getPackagesUrl() {
            return Routes.packages.url;
        }

        function getDetailPackageUrl() {
            return Routes.editionPackages.url;
        }

        function getProductsUrl() {
            return Routes.products.url;
        }

        function getQuotesUrl() {
            return Routes.quotes.url;
        }

        function getQuoteDetail() {
            return Routes.quoteDetail.url;
        }

        function getSupportUrl() {
            return Routes.support.url;
        }

        function canUserAccessSupport() {
            return common.doesUserHasNecessaryRoles(Routes.support.roles);
        }

        function canUserAccessQuotesQuery() {
            return common.doesUserHasNecessaryRoles(Routes.quotes.roles);
        }

        function canUserAccessPackages() {
            return common.doesUserHasNecessaryRoles(Routes.packages.roles);
        }

        function canUserAccessProducts() {
            return common.doesUserHasNecessaryRoles(Routes.products.roles);
        }

        function canUserAccessIndicators() {
            return common.doesUserHasNecessaryRoles(Routes.indicators.roles);
        }

        function selectSupport() {
            deselectAllPages();

            vm.isSupportSelected = true;
        }

        function selectQuotesQuery() {
            deselectAllPages();

            vm.isQuotesQuerySelected = true;
        }

        function selectPackages() {
            deselectAllPages();

            vm.isPackagesSelected = true;
        }

        function selectProducts() {
            deselectAllPages();

            vm.isProductsSelected = true;
        }

        function selectIndicators() {
            deselectAllPages();

            vm.isIndicatorSelected = true;
        }

        //#endregion

        //#region Helper functions

        function deselectAllPages() {
            vm.isSupportSelected = false;
            vm.isQuotesQuerySelected = false;
            vm.isPackagesSelected = false;
            vm.isProductsSelected = false;
            vm.isIndicatorSelected = false;
        }

        
        //#enregion
    }
})();