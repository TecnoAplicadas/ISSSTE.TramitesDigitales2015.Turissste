(function () {
    'use strict';

    var controllerId = 'catalogsController';
    angular
        .module(appName)
        .controller(controllerId, ['$routeParams', '$location', 'common', 'catalogsDataService', 'webApiService', catalogsController]);


    function catalogsController($routeParams, $location, common, catalogsDataService, webApiService) {
        //#region Controller Members

        var vm = this;

        vm.error = false;
        vm.catalogName = null;
        vm.catalogItems = [];
        vm.catalogItemKey = null;
        vm.catalogItem = null;
        vm.booleanArray = [
            true,
            false
        ];

        vm.init = init;
        vm.initCatalog = initCatalog;
        vm.initCatalogItemDetail = initCatalogItemDetail;
        vm.addOrUpdateCatalogItem = addOrUpdateCatalogItem;
        vm.getBooleanComboBoxLabel = getBooleanComboBoxLabel;

        //#endregion

        //#region Functions

        function init() {
            common.logger.log(Messages.info.controllerLoaded, null, controllerId);
            common.activateController([], controllerId);
        }

        function initCatalog(catalogName) {
            vm.catalogName = catalogName;

            var initPromise = getCatalog();

            common.$q.all(initPromise)
                .finally(function () {
                    init();
                })
        }

        function initCatalogItemDetail(catalogName) {
            vm.catalogName = catalogName;
            vm.catalogItemKey = $routeParams[CATALOG_ITEM_KEY_PARAM];

            var initPromise = getCatalogItemDetail();

            common.$q.all(initPromise)
                .finally(function () {
                    init();
                })
        }

        function addOrUpdateCatalogItem() {
            common.displayLoadingScreen();

            return webApiService.makeRetryRequest(1, function () {
                return catalogsDataService.addOrUpdateCatalogItem(vm.catalogName, vm.catalogItemKey, vm.catalogItem);
            })
                .then(function (data) {
                    vm.catalogItemKey = data;
                    common.showSuccessMessage("", Messages.success.catalogItemUpdated)
                })
                .catch(function (reason) {
                    common.showErrorMessage(reason, Messages.error.addOrUpdateItem);
                })
                .finally(function () {
                    common.hideLoadingScreen();
                });
        }

        function getBooleanComboBoxLabel(value) {
            if (value == true)
                return Messages.info.yes;
            else
                return Messages.info.no;
        }

        //#endregion

        //#regio  Helper Methods

        function getCatalog() {
            return webApiService.makeRetryRequest(1, function () {
                return catalogsDataService.getCatalogItems(vm.catalogName);
            })
                .then(function (data) {
                    vm.catalogItems = data;
                })
                .catch(function (reason) {
                    common.showErrorMessage(reason, Messages.error.catalogList);
                });
        }

        function getCatalogItemDetail() {
            return webApiService.makeRetryRequest(1, function () {
                return catalogsDataService.getCatalogItemDetail(vm.catalogName, vm.catalogItemKey);
            })
                .then(function (data) {
                    vm.catalogItem = data;
                })
                .catch(function (reason) {
                    vm.error = true;
                    common.showErrorMessage(reason, Messages.error.catalogItemDetail);
                });
        }

        //#endregion
    }
})
();