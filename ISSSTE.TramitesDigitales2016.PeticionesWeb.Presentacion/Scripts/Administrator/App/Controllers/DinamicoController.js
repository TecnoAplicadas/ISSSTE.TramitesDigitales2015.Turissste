'use strict';
angular.module(appName).controller('DinamicoController', ['$scope', 'ReportesServiceFactory', '$timeout', function ($scope, ReportesServiceFactory, $timeout) {
    $scope.regularExpressionDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    ///Check Inital Date
    $scope.checkInitalDate = function (initialDate) {
        if ($scope.dateDynamicFinal !== undefined) {
            var initialDateString = initialDate.split("/");
            var diffInitialDate = new Date(initialDateString[2], initialDateString[1] - 1, initialDateString[0]);

            var finalDateString = $scope.dateDynamicFinal.split("/");
            var diffFinalDate = new Date(finalDateString[2], finalDateString[1] - 1, finalDateString[0]);

            if (diffInitialDate > diffFinalDate) {
                $scope.dateDynamicFinal = initialDate;
            }

            else {
                $scope.diffDays = $scope.daysDifferenceBetweenDates(diffInitialDate, diffFinalDate);

                if ($scope.diffDays > 90) {
                    $scope.dateDynamicInitial = null;
                    $scope.showTimedMsg("El rango de Fecha Inicio y Fecha Fin no puede ser mayor a 90 días", false, 3000, false);
                }
            }
        }
    };

    ///Check Final Date
    $scope.checkFinalDate = function (finalDate) {
        if ($scope.dateDynamicInitial !== undefined) {
            var initialDateString = $scope.dateDynamicInitial.split("/");
            var diffInitialDate = new Date(initialDateString[2], initialDateString[1] - 1, initialDateString[0]);

            var finalDateString = finalDate.split("/");
            var diffFinalDate = new Date(finalDateString[2], finalDateString[1] - 1, finalDateString[0]);

            if (diffFinalDate < diffInitialDate) {
                $scope.dateDynamicFinal = $scope.dateDynamicInitial;
                $scope.showTimedMsg("Fecha Fin no puede ser menor a Fecha Inicio", false, 3000, false);
            }

            else if (diffInitialDate < diffFinalDate) {
                $scope.diffDays = $scope.daysDifferenceBetweenDates(diffInitialDate, diffFinalDate);

                if ($scope.diffDays > 90) {
                    $scope.dateDynamicFinal = null;
                    $scope.showTimedMsg("El rango de Fecha Inicio y Fecha Fin no puede ser mayor a 90 días", false, 3000, false);
                }
            }
        }
    };

    ///Days Difference Between Dates
    $scope.daysDifferenceBetweenDates = function (initialDate, finalDate) {
        var timeDiff = Math.abs(finalDate.getTime() - initialDate.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        return diffDays;
    };

    ///Show Message
    $scope.showTimedMsg = function (pMessage, pSuccess, pTimeOut, pGoToAnchor) {
        if (pGoToAnchor) {
            $scope.goToAnchor("alertPanel");
        }

        $scope.InfoMessage = {
            entitleSuccessMsg: undefined,
            entitleErrorMsg: undefined
        };

        if (pSuccess) {
            $scope.InfoMessage.entitleSuccessMsg = pMessage;
        }

        else {
            $scope.InfoMessage.entitleErrorMsg = pMessage;
        }

        $timeout(function () {
            $scope.InfoMessage = {
                entitleSuccessMsg: undefined,
                entitleErrorMsg: undefined
            };
        }, pTimeOut);
    };

    ///Get Dynamic Report
    $scope.getDynamicReport = function (form) {
        if (form.$valid) {
            var reporteDinamico = {
                FechaInicio: $scope.dateDynamicInitial,
                FechaFin: $scope.dateDynamicFinal
            };

            ReportesServiceFactory.getReporteDinamico(reporteDinamico)
               .then(function (response) {
                   if (response.data.Result === 1) {
                       $scope.lista = response.data.Data;

                       $timeout(function () {
                           angular.element('#lista').trigger('click');
                       }, 1000);
                   }

                   else if (response.data.Result === 2 || response.data.Result === -1) {
                       $scope.showTimedMsg("Ocurrió un error al ejecutar el Reporte Dinámico", false, 6000, false);
                   }
               })
               .catch(function (err) {
                   $scope.showTimedMsg("Ocurrió un error al ejecutar el Reporte Dinámico", false, 6000, false);
               });
        }

        else {
            angular.forEach(form.$error.required, function (value, key) {
                value.$dirty = true;
            });
        }
    };
}]);