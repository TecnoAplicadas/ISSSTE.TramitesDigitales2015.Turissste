'use strict';
app.controller('PreferenciasController', ['$scope', '$timeout', '$anchorScroll', '$location', '$routeParams', 'PaquetesTuristicosServiceFactory', 'DerechohabienteDataShare', 'ConfiguracionServiceFactory', '$window', 'localStorageService', 'DerechohabienteServiceFactory', '$q',
    function ($scope, $timeout, $anchorScroll, $location, $routeParams, PaquetesTuristicosServiceFactory, DerechohabienteDataShare, ConfiguracionServiceFactory, $window, localStorageService, DerechohabienteServiceFactory, $q) {
        $scope.derechohabiente = {
            IdDerechohabiente: $routeParams.IdDerechohabiente
        };

        $scope.paqueteTuristicoDerechohabiente = {};
        $scope.paqueteTuristicoPromocionado = {};

        $scope.init = function () {
            $scope.realizarEncuesta = localStorageService.get('realizarEncuesta');

            if ($scope.realizarEncuesta !== null) {
                startEncuestaHC(3000, "ISSSTE-04-001-A");

                localStorageService.remove('realizarEncuesta');
            }

            $scope.InfoMessage = DerechohabienteDataShare;
            $scope.getGlobalUrl();
            $scope.getPaqueteTuristicoPorDerechohabiente($scope.derechohabiente.IdDerechohabiente);
            $scope.getPaqueteTuristicoPromocionado();
        }

        $scope.consultaSimulador = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            DerechohabienteServiceFactory.getDerechohabienteById($scope.derechohabiente.IdDerechohabiente)
                .then(function (response) {
                    defered.resolve(response);

                    if (response.data.Result === 1) {
                        var url = $scope.otorgamientoUrl.Valor.replace('numeroIssste', response.data.Data.NoIssste);

                        $window.open(url, "Simulador de otorgamiento de crédito turístico.", "width=800, height=600");
                    }

                    else if (response.data.Result === 2 || response.data.Result === -1) {
                        $log.warn("Ocurrió un error al almacenar consultar el servicio de Afliación y Vigencia. ERR: " + response.data.Message);
                    }
                })
                .catch(function (err) {
                    $scope.message = err.data.error_description;
                });

            return promise;
        }

        $scope.consultaTurissste = function () {
            $window.open("https://www.gob.mx/turissste/");
        }

        $scope.getGlobalUrl = function () {
            ConfiguracionServiceFactory.getConfigurationByKey('GlobalizadorLink').then(function (response) {
                if (response.data.Result === 1) {
                    $scope.globalizUrl = response.data.Data;
                } else {
                    $scope.showTimedMsg("Ocurrio un error al obtener la información del paquete turistico. ERR:" + response.data.Message, false, 5000);
                }
            });

            ConfiguracionServiceFactory.getConfigurationByKey('OtorgamientoUrl').then(function (response) {
                if (response.data.Result === 1) {
                    $scope.otorgamientoUrl = response.data.Data;
                } else {
                    $scope.showTimedMsg("Ocurrio un error al obtener la información del paquete turistico. ERR:" + response.data.Message, false, 5000);
                }
            });
        };

        $scope.consultaGlobalizadorSite = function () {
            var auxUrlGlob = $scope.globalizUrl.Valor;

            if (auxUrlGlob === "") {
                $window.open("../Images/Entitle/PAQ_NO_DIS_SIN_AOL-01-01.jpg");
            }

            else {
                $window.open(auxUrlGlob);
            }
        };

        ///Obtener Paquete Turistico por Derechohabiente
        $scope.getPaqueteTuristicoPorDerechohabiente = function (idDerechohabiente) {
            PaquetesTuristicosServiceFactory.getPaqueteTuristicoPorDerechohabiente(idDerechohabiente).then(function (response) {
                if (response.data.Result === 1) {
                    $scope.paqueteTuristicoDerechohabiente = response.data.Data;
                }

                if (response.data.Result === 0) {
                    $scope.imagenNoDisponible = "../Images/Entitle/IMG_NO_DIS_ok-01.jpg";
                }

                else if (response.data.Result === -1 || response.data.Result === 2) {
                    $scope.showTimedMsg("Ocurrio un error al obtener la información del paquete turistico. ERR:" + response.data.Message, false, 5000);
                }
            },
            function (err) {
                $scope.message = err.data.error_description;
            });
        };

        ///Obtener Paquete Turistico Promocionado
        $scope.getPaqueteTuristicoPromocionado = function () {
            PaquetesTuristicosServiceFactory.getPaqueteTuristicoPromocionado().then(function (response) {
                if (response.data.Result === 1) {
                    $scope.paqueteTuristicoPromocionado = response.data.Data;
                }

                if (response.data.Result === 0) {
                    $scope.imagenNoDisponiblePromocion = "../Images/Entitle/IMG_NO_DIS_ok-01.jpg";
                }

                else if (response.data.Result === -1 || response.data.Result === 2) {
                    $scope.showTimedMsg("Ocurrio un error al obtener la información del paquete turistico promocionado. ERR:" + response.data.Message, false, 8000);
                }
            },
            function (err) {
                $scope.message = err.data.error_description;
            });
        };

        $scope.showTimedMsg = function (pMessage, pSuccess, pTimeOut) {
            $scope.InfoMessage.entitleSuccessMsg = undefined;
            $scope.InfoMessage.entitleErrorMsg = undefined;

            if (pSuccess) {
                $scope.InfoMessage.entitleSuccessMsg = pMessage;
            }

            else {
                $scope.InfoMessage.entitleErrorMsg = pMessage;
            }

            $scope.goToAnchor("alertPanel");

            $timeout(function () {
                $scope.InfoMessage.entitleSuccessMsg = undefined;
                $scope.InfoMessage.entitleErrorMsg = undefined;
            }, pTimeOut);
        };

        $scope.goToAnchor = function (id) {
            var newHash = id;

            if ($location.hash() !== newHash) {
                $location.hash(id);
            }

            else {
                $anchorScroll();
            }
        }

        $scope.init();
    }]);