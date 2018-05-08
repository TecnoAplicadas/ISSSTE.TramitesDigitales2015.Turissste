'use strict';
app.controller('EncuestaController', ['$scope', '$timeout', '$anchorScroll', '$location', '$window', 'EncuestaServiceFactory', 'TipoDestinoServiceFactory', 'TemporadasServiceFactory', 'TipoViajeServiceFactory', 'MotivosViajeServiceFactory', 'DerechohabienteServiceFactory', 'DerechohabienteDataShare', 'localStorageService', '$rootScope', function ($scope, $timeout, $anchorScroll, $location, $window, EncuestaServiceFactory, TipoDestinoServiceFactory, TemporadasServiceFactory, TipoViajeServiceFactory, MotivosViajeServiceFactory, DerechohabienteServiceFactory, DerechohabienteDataShare, localStorageService, $rootScope) {
    $scope.serviceBase = $rootScope.baseUrl;

    $scope.derechohabiente = {};
    $scope.contactInformation = {};
    $scope.encuesta = {};

    $scope.tiposDestinoList = [];
    $scope.temporadasList = [];
    $scope.tiposViajeList = [];
    $scope.motivosViajeList = [];

    $scope.init = function () {
        $scope.InfoMessage = DerechohabienteDataShare;

        $scope.getTiposDestino();
        $scope.getTemporadas();
        $scope.getTiposViaje();
        $scope.getMotivosViaje();
    };

    ///Get Tipos Destino
    $scope.getTiposDestino = function () {
        TipoDestinoServiceFactory.getTiposDestino()
            .then(function (response) {
                if (response.data.Result === 1) {
                    $scope.tiposDestinoList = response.data.Data;
                }

                else if (response.data.Result === 2 || response.data.Result === -1) {
                    $scope.showTimedMsg("Ha ocurrido un error al cargar el Catálogo Tipos Destino. ERR:" + response.data.Message, false, 8000);
                }
            })
            .catch(function (err) {
                $scope.message = response.data.Message;
                $scope.showTimedMsg("Ha ocurrido un error al cargar el Catálogo Tipos Destino. ERR:" + response.data.Message, false, 8000);
            });
    };

    ///Get Temporadas
    $scope.getTemporadas = function () {
        TemporadasServiceFactory.getTemporadas()
            .then(function (response) {
                if (response.data.Result === 1) {
                    $scope.temporadasList = response.data.Data;
                }

                else if (response.data.Result === 2 || response.data.Result === -1) {
                    $scope.showTimedMsg("Ha ocurrido un error al cargar el Catálogo Temporadas. ERR:" + response.data.Message, false, 8000);
                }
            })
            .catch(function (err) {
                $scope.message = response.data.Message;
                $scope.showTimedMsg("Ha ocurrido un error al cargar el Catálogo Temporadas. ERR:" + response.data.Message, false, 8000);
            });
    };

    ///Get Tipos Viaje
    $scope.getTiposViaje = function () {
        TipoViajeServiceFactory.getTiposViaje()
            .then(function (response) {
                if (response.data.Result === 1) {
                    $scope.tiposViajeList = response.data.Data;
                }

                else if (response.data.Result === 2 || response.data.Result === -1) {
                    $scope.showTimedMsg("Ha ocurrido un error al cargar el Catálogo Tipos Viaje. ERR:" + response.data.Message, false, 8000);
                }
            })
            .catch(function (err) {
                $scope.message = response.data.Message;
                $scope.showTimedMsg("Ha ocurrido un error al cargar el Catálogo Tipos Viaje. ERR:" + response.data.Message, false, 8000);
            });
    };

    ///Get Motivos Viaje
    $scope.getMotivosViaje = function () {
        MotivosViajeServiceFactory.getMotivosViaje()
            .then(function (response) {
                if (response.data.Result === 1) {
                    $scope.motivosViajeList = response.data.Data;
                }

                else if (response.data.Result === 2 || response.data.Result === -1) {
                    $scope.showTimedMsg("Ha ocurrido un error al cargar el Catálogo Motivos Viaje. ERR:" + response.data.Message, false, 8000);
                }
            })
            .catch(function (err) {
                $scope.message = response.data.Message;
                $scope.showTimedMsg("Ha ocurrido un error al cargar el Catálogo Motivos Viaje. ERR:" + response.data.Message, false, 8000);
            });
    };

    ///Save Quiz
    $scope.saveQuiz = function (form) {
        if (form.$valid) {
            $scope.encuesta = {
                IdTipoDestino: $scope.encuestaTipoDestino.IdTipoDestino,
                IdTemporada: $scope.encuestaTemporada.IdTemporada,
                IdTipoViaje: $scope.encuestaTipoViaje.IdTipoViaje,
                IdMotivoViaje: $scope.encuestaMotivoViaje.IdMotivoViaje,
                FechaAplicacion: new Date()
            };

            $scope.currentUser = localStorageService.get('currentUser').User;

            if ($scope.currentUser.IdDerechohabiente !== null) {
                $scope.encuesta.IdDerechohabiente = $scope.currentUser.IdDerechohabiente;

                $scope.derechohabiente = $scope.currentUser;

                $scope.saveEncuesta($scope.encuesta);
            }

            else if ($scope.currentUser.IdDerechohabiente === null) {
                $scope.derechohabiente = $scope.currentUser;
                $scope.derechohabiente.TipoDerechohabiente = $scope.derechohabiente.TipoDerechohabiente === "TRABAJADOR" ? "T" : "P"

                $scope.contactInformation = localStorageService.get('contactInformation');

                $scope.derechohabiente.Telefono = $scope.contactInformation !== null ? $scope.contactInformation.Telefono : null;
                $scope.derechohabiente.Lada = $scope.contactInformation !== null ? $scope.contactInformation.Lada : null;
                $scope.derechohabiente.CorreoElectronico = $scope.contactInformation !== null ? $scope.contactInformation.CorreoElectronico : null;
                $scope.derechohabiente.RecibirInformacion = $scope.contactInformation !== null ? $scope.contactInformation.RecibirInformacion : null;

                $scope.addDerechohabiente($scope.derechohabiente);
            }

            localStorageService.remove('currentUser');
            localStorageService.remove('contactInformation');
        }

        else {
            angular.forEach(form.$error.required, function (value, key) {
                value.$dirty = true;
            });

            $scope.showTimedMsg("No has seleccionado todas las opciones requeridas. Por favor verificalo", false, 300000);
        }
    };

    ///Add Derechohabiente
    $scope.addDerechohabiente = function (derechohabiente) {
        DerechohabienteServiceFactory.addDerechohabiente(derechohabiente)
            .then(function (response) {
                if (response.data.Result === 1) {
                    $scope.encuesta.IdDerechohabiente = response.data.Data;
                    $scope.saveEncuesta($scope.encuesta);
                }

                else if (response.data.Result === 2 || response.data.Result === -1) {
                    $scope.showTimedMsg("Ha ocurrido un error al agregar al Derechohabiente. ERR:" + response.data.Message, false, 8000);
                }
            })
            .catch(function (err) {
                $scope.message = response.data.Message;
                $scope.showTimedMsg("Ha ocurrido un error al agregar al Derechohabiente. ERR:" + response.data.Message, false, 8000);
            });
    };

    ///Save Encuesta
    $scope.saveEncuesta = function (encuesta) {
        EncuestaServiceFactory.addEncuesta(encuesta)
            .then(function (response) {
                if (response.data.Result === 1) {
                    $scope.showTimedMsg("Se han guardado tus preferencias con éxito.", true, 3000);
                    localStorageService.set('realizarEncuesta', true);
                    $window.location.href = $scope.serviceBase + '/Entitle/Index?NoIssste=' + $scope.derechohabiente.NoIssste;
                }

                else if (response.data.Result === 2 || response.data.Result === -1) {
                    $scope.showTimedMsg("Ha ocurrido un error al agregar la encuesta. ERR:" + response.data.Message, false, 8000);
                }
            })
            .catch(function (err) {
                $scope.showTimedMsg("Ha ocurrido un error al agregar la encuesta. ERR:" + response.data.Message, false, 8000);
            });
    };

    $scope.showTimedMsg = function (pMessage, pSuccess, pTimeOut) {
        $scope.InfoMessage.entitleSuccessMsg = undefined;
        $scope.InfoMessage.entitleErrorMsg = undefined;

        if (pSuccess) {
            $scope.InfoMessage.entitleSuccessMsg = pMessage;
        } else {
            $scope.InfoMessage.entitleErrorMsg = pMessage;
        }

        $window.scrollTo(0, 700);
    }

    $scope.goToAnchor = function (id) {
        var newHash = id;
        if ($location.hash() !== newHash) {
            $location.hash(id);
        } else {
            $anchorScroll();
        }
    }

    $scope.init();
}]);