'use strict';
angular.module(appName).controller('EstaticoController', ['$scope', 'RangoEdadesServiceFactory', 'EstadosServiceFactory', 'GeneroServiceFactory', 'ReportesServiceFactory', '$timeout', function ($scope, RangoEdadesServiceFactory, EstadosServiceFactory, GeneroServiceFactory, ReportesServiceFactory, $timeout) {
    $scope.staticAgeRange = null;
    $scope.staticGender = null;
    $scope.staticState = null;
    $scope.regularExpressionDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    $scope.reporteEstatico = {};

    $scope.rangoEdadesList = [];
    $scope.generoList = [];
    $scope.estadosList = [];

    $scope.init = function () {
        $scope.getRangosEdades();
        $scope.getGeneros();
        $scope.getEstados();
    };

    ///Get Rangos Edades
    $scope.getRangosEdades = function () {
        RangoEdadesServiceFactory.getRangosEdades()
           .then(function (response) {
               if (response.data.Result === 1) {
                   $scope.rangoEdadesList = response.data.Data;
               }

               else if (response.data.Result === 2 || response.data.Result === -1) {
                   $scope.showTimedMsg("Ocurrió un error al cargar el Catálogo de Rangos de Edades", false, 6000, false);
               }
           })
           .catch(function (err) {
               $scope.showTimedMsg("Ocurrió un error al cargar el Catálogo de Rangos de Edades", false, 6000, false);
           });
    };

    ///Get Generos
    $scope.getGeneros = function () {
        GeneroServiceFactory.getGeneros()
           .then(function (response) {
               if (response.data.Result === 1) {
                   $scope.generoList = response.data.Data;
               }

               else if (response.data.Result === 2 || response.data.Result === -1) {
                   $scope.showTimedMsg("Ocurrió un error al cargar el Catálogo de Géneros", false, 6000, false);
               }
           })
           .catch(function (err) {
               $scope.showTimedMsg("Ocurrió un error al cargar el Catálogo de Géneros", false, 6000, false);
           });
    };

    ///Get Estados
    $scope.getEstados = function () {
        EstadosServiceFactory.getEstados()
           .then(function (response) {
               if (response.data.Result === 1) {
                   $scope.estadosList = response.data.Data;
               }

               else if (response.data.Result === 2 || response.data.Result === -1) {
                   $scope.showTimedMsg("Ocurrió un error al cargar el Catálogo de Estados", false, 6000, false);
               }
           })
           .catch(function (err) {
               $scope.showTimedMsg("Ocurrió un error al cargar el Catálogo de Estados", false, 6000, false);
           });
    };

    ///Check Inital Date
    $scope.checkInitalDate = function (initialDate) {
        if ($scope.stateStaticFinal !== undefined) {
            var initialDateString = initialDate.split("/");
            var diffInitialDate = new Date(initialDateString[2], initialDateString[1] - 1, initialDateString[0]);

            var finalDateString = $scope.stateStaticFinal.split("/");
            var diffFinalDate = new Date(finalDateString[2], finalDateString[1] - 1, finalDateString[0]);

            if (initialDate > $scope.stateStaticFinal) {
                $scope.stateStaticFinal = initialDate;
            }

            else {
                $scope.diffDays = $scope.daysDifferenceBetweenDates(diffInitialDate, diffFinalDate);

                if ($scope.diffDays > 90) {
                    $scope.dateStaticInitial = null;
                    $scope.showTimedMsg("El rango de Fecha Inicio y Fecha Fin no puede ser mayor a 90 días", false, 3000, false);
                }
            }
        }
    };

    ///Check Final Date
    $scope.checkFinalDate = function (finalDate) {
        if ($scope.dateStaticInitial !== undefined) {
            var initialDateString = $scope.dateStaticInitial.split("/");
            var diffInitialDate = new Date(initialDateString[2], initialDateString[1] - 1, initialDateString[0]);

            var finalDateString = finalDate.split("/");
            var diffFinalDate = new Date(finalDateString[2], finalDateString[1] - 1, finalDateString[0]);

            if (diffFinalDate < diffInitialDate) {
                $scope.stateStaticFinal = $scope.dateStaticInitial;
                $scope.showTimedMsg("Fecha Fin no puede ser menor a Fecha Inicio", false, 3000, false);
            }

            else if (diffInitialDate < diffFinalDate) {
                $scope.diffDays = $scope.daysDifferenceBetweenDates(diffInitialDate, diffFinalDate);

                if ($scope.diffDays > 90) {
                    $scope.stateStaticFinal = null;
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

    ///Get Reporte Estatico
    $scope.getReporteEstatico = function (form) {
        if (form.$valid) {
            $scope.reporteEstatico = {
                RangoInferior: $scope.staticAgeRange === null ? null : $scope.staticAgeRange.RangoInferior,
                RangoSuperior: $scope.staticAgeRange === null ? null : $scope.staticAgeRange.RangoSuperior,
                IdGenero: $scope.staticGender === null ? null : $scope.staticGender.IdGenero,
                IdEstado: $scope.staticState === null ? null : $scope.staticState.IdEstado,
                FechaInicio: $scope.dateStaticInitial,
                FechaFin: $scope.stateStaticFinal
            };

            ReportesServiceFactory.getReporteEstatico($scope.reporteEstatico)
               .then(function (response) {
                   if (response.data.Result === 1) {
                       $scope.lista = response.data.Data;

                       $timeout(function () {
                           angular.element('#lista').trigger('click');
                       }, 1000);
                   }

                   else if (response.data.Result === 2 || response.data.Result === -1) {
                       $scope.showTimedMsg("Ocurrió un error al ejecutar el Reporte Estático", false, 6000, false);
                   }
               })
               .catch(function (err) {
                   $scope.showTimedMsg("Ocurrió un error al ejecutar el Reporte Estático", false, 6000, false);
               });
        }

        else {
            //Mostrar errores de validación
            angular.forEach(form.$error.required, function (value, key) {
                value.$dirty = true;
            });
        }
    };

    $scope.init();
}]);