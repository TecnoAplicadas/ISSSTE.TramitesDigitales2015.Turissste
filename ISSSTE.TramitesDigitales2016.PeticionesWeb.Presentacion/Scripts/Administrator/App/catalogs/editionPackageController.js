(function(){
    'use strict';

    var controllerId = 'editionPackageController';
    angular
        .module(appName)
        .controller(controllerId, ['$routeParams', '$location', 'common', 'editionPackageDataService', 'webApiService', editionPackageController]);

    function editionPackageController($routeParams, $location, common, editionPackageDataService, webApiService) {
        var vm = this;

        vm.error = false;

        vm.initTypesProductCatalog = initTypesProductCatalog;
        vm.manageUpdatePackage = manageUpdatePackage;        
        vm.returnToPackageList = returnToPackageList;

        vm.typesProduct = [];



        function init() {
            common.logger.log(Messages.info.controllerLoaded, null, controllerId);
            common.activateController([], controllerId);
        }

        function initTypesProductCatalog() {
            var promise = null;

            common.displayLoadingScreen();

            promise = getTypesProduct(common.config.requestInformation.packageId);

            promise.finally(function () {
                common.hideLoadingScreen();
            });
        }

        function getTypesProduct(packageId) {
            var promise = null;

            promise = webApiService.makeRetryRequest(1, function () {
                return editionPackageDataService.getTypesProduct(packageId);
            });

            promise.then(function (data) {
                vm.typesProduct = data;
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.gettingTypesProduct);
            });


            return promise;
        }

        function addTypeProductToPackage(packageId, typeProductFromSirvel) {
            var promise = null;

            common.displayLoadingScreen();

            var typeProductToAdd = {
                PackageId: packageId,
                ProductTypeId: typeProductFromSirvel.IdType,
                Description: typeProductFromSirvel.Name
            };

            promise = webApiService.makeRetryRequest(1, function () {
                return editionPackageDataService.addTypeProductToPackage(typeProductToAdd);
            });

            promise.then(function (data) {
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.addingTypesProduct);
            });

            promise.finally(function () {
                common.hideLoadingScreen();
            });
        }

        function removeTypeProductFromPackage(packageId, typeProductId) {
            var promise = null;

            common.displayLoadingScreen();

            promise = webApiService.makeRetryRequest(1, function () {
                return editionPackageDataService.removeTypeProductFromPackage(packageId, typeProductId);
            });

            promise.then(function (data) {
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.removingTypesProduct);
            });

            promise.finally(function () {
                common.hideLoadingScreen();
            });
        }

        function manageUpdatePackage(type) {
            if (type.IsIncludedInPackage) {
                addTypeProductToPackage(common.config.requestInformation.packageId, type.TypeProduct);
            }
            else {
                removeTypeProductFromPackage(common.config.requestInformation.packageId, type.TypeProduct.IdType);
            }
        }

        function returnToPackageList(navigate) {
            common.config.requestInformation.packageId = null;
            navigate();
        }
    }

})();