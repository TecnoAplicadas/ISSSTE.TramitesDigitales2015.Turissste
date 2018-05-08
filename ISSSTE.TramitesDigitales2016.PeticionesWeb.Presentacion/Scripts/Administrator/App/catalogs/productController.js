(function(){
    'use strict';

    var controllerId = 'productController';
    angular
        .module(appName)
        .controller(controllerId, ['$routeParams', '$location', 'common', 'productDataService', 'webApiService', productController]);

    function productController($routeParams, $location, common, productDataService, webApiService) {

        var vm = this;

        vm.initProducts = initProducts;
        vm.isPageSelected = isPageSelected;
        vm.isFirstPage = isFirstPage;
        vm.isLasPage = isLasPage;
        vm.changeSelectedPage = changeSelectedPage;
        vm.changeToPreviousPage = changeToPreviousPage;
        vm.changeToNextPage = changeToNextPage;
        vm.serchProducts = serchProducts;
        vm.hasImage = hasImage;
        vm.getNoImage = getNoImage;
        vm.addImageToProduct = addImageToProduct;
        vm.isReadyImage = isReadyImage;
        vm.removeImageFromProduct = removeImageFromProduct;

        vm.error = false;
        vm.productsWereLoaded = false;
        vm.pageSizes = [
            6, 12, 18, 24
        ];
        vm.selectedPageSize = vm.pageSizes[0];
        vm.pages = [1];
        vm.totalPages = 1;
        vm.selectedPage = 1;
        vm.products = [];
        vm.pathNoImage = '';
        vm.image = null;
        vm.productIdSelected = null;

        //#region Constants

        var MAX_PAGES = 11;

        //#enregion

        //#region Fields

        var paginationHelper = new PaginationHelper(MAX_PAGES);

        //#endregion


        function initProducts() {
            var promise = null;

            common.displayLoadingScreen();

            promise = loadProductsOnDigitalTape();
            
        }

        //Realiza la carga de productos y servicios existentes en
        //Sirvel, que no existenen el sistema de trámites digitales
        function loadProductsOnDigitalTape() {
            var promise = null;

            common.displayLoadingScreen();

            promise = webApiService.makeRetryRequest(1, function () {
                return productDataService.loadProductsFromSirvel();
            });

            promise.then(function (data) {
                vm.productsWereLoaded = data;
                serchProducts();
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.loadingProductsFromSirvel);
                common.hideLoadingScreen();
            });            
        }

        function showAvailableProducts() {
            var promise = null;

            promise = webApiService.makeRetryRequest(1, function () {
                return productDataService.getProducts(vm.selectedPageSize, vm.selectedPage);
            });

            promise.then(function (data) {
                vm.selectedPage = data.CurrentPage;
                vm.totalPages = data.TotalPages;

                vm.pages = paginationHelper.getPages(vm.selectedPage, vm.totalPages);

                vm.products = data.Products;
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.showingAvailableProducts);
            });           

            return promise;
            
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

                vm.serchProducts();
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

        function serchProducts() {
            var promise = null;
            common.displayLoadingScreen();

            promise = showAvailableProducts();

            promise.finally(function () {
                common.hideLoadingScreen();
            });
        }

        function hasImage(product) {            
            return product.ImageToBase64 != '';
        }

        function getNoImage() {
            return productDataService.getNoImage();
        }

        function isReadyImage(product) {
            return product.image != null && product.image != undefined && product.image.File != null;
        }        

        function addImageToProduct(product) {

            var promise = null;

            common.displayLoadingScreen();

            promise = webApiService.makeRetryRequest(1, function () {
                return productDataService.addImageToProduct(product.Product.SirvelProductId, product.image.File);
            });

            promise.then(function (data) {
                product.ImageToBase64 = data;
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.addingImageToProduct);
            });

            promise.finally(function () {
                product.image = null;
                common.hideLoadingScreen();
            });
        }

        function removeImageFromProduct(product) {
            var promise = null;

            common.displayLoadingScreen();

            promise = webApiService.makeRetryRequest(1, function () {
                return productDataService.removeImageFromProduct(product.Product.SirvelProductId);
            });

            promise.then(function () {
                product.ImageToBase64 = '';
                product.image = null;
            });

            promise.catch(function (reason) {
                common.showErrorMessage(reason, Messages.error.removingImageFromProduct);
            });

            promise.finally(function () {                
                common.hideLoadingScreen();
            });
        }

    }

})();