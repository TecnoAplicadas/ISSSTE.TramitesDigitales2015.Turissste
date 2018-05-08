(function (){
    'use strict';

    var controllerId = 'packageController';
    angular
        .module(appName)
        .controller(controllerId, ['$routeParams', '$location', 'common', 'packageDataService', 'webApiService', packageController]);

    function packageController($routeParams, $location, common, packageDataService, webApiService) {

        var vm = this;

        vm.error = false;

        vm.initPackagesList = initPackagesList;
        vm.setEditionMode = setEditionMode;
        vm.setViewMode = setViewMode;
        vm.packageInEdition = packageInEdition;
        vm.updatePackage = updatePackage;
        vm.createPackage = createPackage;
        vm.goToDetail = goToDetail;

        vm.isEditionMode = false;
        vm.packageIdCurrentlyInEdition = 0;
        vm.packages = [];
        vm.packageName = "";
        vm.packageIsRequerided = false;
        vm.packageIsActive = true;


        function init() {
            common.logger.log(Messages.info.controllerLoaded, null, controllerId);
            common.activateController([], controllerId);
        }

        function initPackagesList() {            
            var promise = null;
            common.displayLoadingScreen();

            promise = getPackages();

            promise.finally(function () {
                common.hideLoadingScreen();
            });

        }

        function getPackages() {            
            var promise = null;

            promise = webApiService.makeRetryRequest(1, function () {
                return packageDataService.getPackages();
            });

            promise.then(function (data) {
                vm.packages = data;
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.gettingPackages);
            });

            return promise;
        }

        function updatePackage(packageToUpdate) {
            var promise = null;

            common.displayLoadingScreen();

            promise = webApiService.makeRetryRequest(1, function () {
                return packageDataService.updatePackage(packageToUpdate);
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.updatingPackages);
            });

            promise.finally(function () {
                vm.isEditionMode = false;
                common.hideLoadingScreen();
            });
        }

        function createPackage() {
            var promise = null;

            common.displayLoadingScreen();

            var packageToCreate = {
                Name: vm.packageName,
                IsRequired: vm.packageIsRequerided,
                IsActive: vm.packageIsActive
            };

            promise = webApiService.makeRetryRequest(1, function () {
                return packageDataService.createPackage(packageToCreate);
            });

            promise.then(function (data) {
                packageToCreate.PackageId = data;
                vm.packages.push(packageToCreate);

                //Inicializa valores de controles
                vm.packageName = "";
                vm.packageIsRequerided = false;
                vm.packageIsActive = true;
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.creatingPackages);
            });

            promise.finally(function () {
                common.hideLoadingScreen();
            });            

        }

        function setEditionMode(packageId) {
            vm.isEditionMode = true;
            vm.packageIdCurrentlyInEdition = packageId;
        }

        function setViewMode() {
            vm.isEditionMode = false;
            vm.packageIdCurrentlyInEdition = 0;
        }

        function packageInEdition(packageId) {
            return vm.isEditionMode && vm.packageIdCurrentlyInEdition == packageId;
        }

        function goToDetail(packageId, navigate) {
            common.config.requestInformation.packageId = packageId;
            navigate();
        }
         
    }

})();