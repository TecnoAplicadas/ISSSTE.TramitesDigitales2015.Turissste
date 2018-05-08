'use strict';
angular.module(appName).controller('ReportesController', ['$scope', '$location', function ($scope, $location) {

    $scope.redirectToStatic = function () {
        $location.url("/ReporteEstatico");
    }

    $scope.redirectToDinamyc = function () {
        $location.url("/ReporteDinamico");
    }

    $scope.init = function () {
       
    };

    $scope.init();
}]);