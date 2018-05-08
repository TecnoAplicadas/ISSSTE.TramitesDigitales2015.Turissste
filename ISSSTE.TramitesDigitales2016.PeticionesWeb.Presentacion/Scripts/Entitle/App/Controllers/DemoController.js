'use strict';
app.controller('DemoController', ['$scope', 'WebApiService', 'PaquetesTuristicosServiceFactory', function ($scope, WebApiService, PaquetesTuristicosServiceFactory) {

    $scope.message = "Now viewing about!";

    $scope.derechohabiente = {
        IdDerechohabiente: 1
    };

    $scope.message = "";

    $scope.paqueteTursitico = {};

    $scope.init = function () {
        $scope.getPaqueteTuristicoPorDerechohabiente();
    };

    //$scope.getPaqueteTuristicoPorDerechohabiente = function () {
    //    return WebApiService.makeRetryRequest(1, function () {
    //        return PaquetesTuristicosServiceFactory.getPaqueteTuristicoPorDerechohabiente($scope.derechohabiente);
    //    })
    //        .then(function (data) {
    //            $scope.paqueteTursitico = data;
    //        })
    //        .catch(function (reason) {
    //            //common.showErrorMessage(reason, Messages.error.catalogList);
    //        });
    //};

    $scope.getPaqueteTuristicoPorDerechohabiente = function () {
        PaquetesTuristicosServiceFactory.getPaqueteTuristicoPorDerechohabiente($scope.derechohabiente).then(function (response) {
            if (response.data.Result === 1) {
                $scope.paqueteTursitico = response.data.Data;
                $scope.message = response.data.Message;
            }
            else {
                $scope.message = response.data.Message;
            }
        },
        function (err) {
            $scope.message = err.data.error_description;
        });
    };

    $scope.init();
}]);