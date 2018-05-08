(function(){
    'use strict';

    angular
        .module(appName)
        .factory('productDataService', ['$http', 'common', 'appConfig', 'authenticationService','Upload', productDataService]);

    function productDataService($http, common, appConfig, authenticationService, Upload) {

        var factory = {
            loadProductsFromSirvel: loadProductsFromSirvel,
            getProducts: getProducts,
            addImageToProduct: addImageToProduct,
            removeImageFromProduct: removeImageFromProduct,
            getNoImage: getNoImage
        };

        return factory;

        function loadProductsFromSirvel() {
            var url = common.getBaseUrl() + 'api/Administrator/Products/Load';
            var accessToken = authenticationService.getAccessToken();

            return $http.get(url,
                {
                    headers: {
                        'Content-Type': JSON_CONTENT_TYPE,
                        'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                    }
                });
        }

        function getProducts(pageSize,page) {
            var url = common.getBaseUrl() + 'api/Administrator/Products?pageSize={0}&page={1}'.format(pageSize, page);
            var accessToken = authenticationService.getAccessToken();

            return $http.get(url,
                {
                    headers: {
                        'Content-Type': JSON_CONTENT_TYPE,
                        'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                    }
                });
        }

        function addImageToProduct(productId, image) {
            var deferred = common.$q.defer();
            var promise = deferred.promise;           

            if (image) {
                var url = common.getBaseUrl() + 'api/Administrator/Products/{0}/Image/Add'.format(productId);
                var accessToken = authenticationService.getAccessToken();

                promise = Upload.upload({
                    url: url,
                    //fields: {
                    //    'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                    //},
                    file: image
                });
            }
            else {
                deferred.resolve();
            }

            return promise;

        }

        function removeImageFromProduct(productId) {
            var url = common.getBaseUrl() + 'api/Administrator/Products/{0}/Image/Delete'.format(productId);
            var accessToken = authenticationService.getAccessToken();

            return $http.delete(url,
                              {
                                  headers: {
                                      'Content-Type': JSON_CONTENT_TYPE,
                                      'Authorization': BEARER_TOKEN_AUTHENTICATION_TEMPLATE.format(accessToken)
                                  }
                              }
            );
        }


        function getNoImage() {
            var url = common.getBaseUrl() + 'Images/Administrator/noimage.png';

            return url;
        }
    }
})();