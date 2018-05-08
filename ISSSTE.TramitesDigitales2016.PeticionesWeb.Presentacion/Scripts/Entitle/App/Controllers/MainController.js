'use strict';
app.controller('MainController', ['$scope', '$q', '$timeout', '$anchorScroll', '$routeParams', '$location', '$log', 'DerechohabienteServiceFactory', 'DerechohabienteDataShare', 'EncuestaServiceFactory', 'localStorageService', function ($scope, $q, $timeout, $anchorScroll, $routeParams, $location, $log, DerechohabienteServiceFactory, DerechohabienteDataShare, EncuestaServiceFactory, localStorageService) {

    $scope.makeTabActive = function (pTabActive) {
        $scope.tab01Class = '';
        $scope.tab02Class = '';
        $scope.tab03Class = '';

        switch (pTabActive) {
            case "01":
                $scope.tab01Class = 'active';
                break;
            case "02":
                $scope.tab02Class = 'active';
                break;
            case "03":
                $scope.tab03Class = 'active';
                break;
        }
    };

    $scope.init = function () {
        $scope.regexEmail = /^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]{2,3}(\.[a-zA-Z]{2,3})*$/;
        $scope.regexIsValid = true;
        $scope.lada = null;
        $scope.phoneNumber = null;
        $scope.mail = null;
        $scope.isReceiveInformation = false;

        $scope.derechohabiente = {};
        $scope.InfoMessage = DerechohabienteDataShare;
        $scope.NoIssste = $scope.getNoIssste("NoIssste");
        $scope.makeTabActive('01');
        $scope.getDerechohabienteByNoIssste($scope.NoIssste);
    };

    $scope.getNoIssste = function (stringUrl) {
        stringUrl = stringUrl.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + stringUrl + "=([^&#]*)", "gi"),
        results = regex.exec(window.location.search);

        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    ///Get Derechohabiente By No Issste
    $scope.getDerechohabienteByNoIssste = function (noIssste) {
        var defered = $q.defer();
        var promise = defered.promise;

        DerechohabienteServiceFactory.getDerechohabienteByNoIssste(noIssste)
            .then(function (response) {
                defered.resolve(response);

                if (response.data.Result === 1 & response.data.Data !== null) {
                    $scope.derechohabiente = response.data.Data;
                    $scope.lada = $scope.derechohabiente.Lada;
                    $scope.phoneNumber = $scope.derechohabiente.Telefono;
                    $scope.mail = $scope.derechohabiente.CorreoElectronico;
                    $scope.isReceiveInformation = $scope.derechohabiente.RecibirInformacion;

                    $scope.encuestaExist($scope.derechohabiente.IdDerechohabiente);
                }

                else if (response.data.Result === 1 & response.data.Data === null) {
                    $scope.getDerechohabienteService(noIssste);
                }

                else if (response.data.Result === 2 || response.data.Result === -1) {
                    $log.warn("Ocurrió un error al almacenar consultar la información del Derechohabiente. ERR: " + response.data.Message);
                }
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    ///Get Derechohabiente Service
    $scope.getDerechohabienteService = function (noIssste) {
        var defered = $q.defer();
        var promise = defered.promise;

        DerechohabienteServiceFactory.getDerechohabienteService(noIssste)
            .then(function (response) {
                defered.resolve(response);

                if (response.data.Result === 1) {
                    $scope.derechohabiente = response.data.Data;
                    $scope.lada = $scope.derechohabiente.Lada;
                    $scope.phoneNumber = $scope.derechohabiente.Telefono;
                    $scope.mail = $scope.derechohabiente.CorreoElectronico;
                    $scope.isReceiveInformation = $scope.derechohabiente.RecibirInformacion;

                    $location.path('Encuesta');
                }

                else if (response.data.Result === 2 || response.data.Result === -1) {
                    $scope.showTimedMsg("Ocurrió un error al consultar el servicio de Afliación y Vigencia.", false, 300000);
                    $log.warn("Ocurrió un error al consultar el servicio de Afliación y Vigencia. ERR: " + response.data.Message);
                }
            })
            .catch(function (err) {
                $scope.message = err.data.error_description;
            });

        return promise;
    };

    ///Check if Quiz exists
    $scope.encuestaExist = function (idDerechohabiente) {
        var defered = $q.defer();
        var promise = defered.promise;

        EncuestaServiceFactory.encuestaExist(idDerechohabiente)
            .then(function (response) {
                defered.resolve(response);

                if (response.data.Result === 1 && response.data.Data) {
                    $location.path('Preferencias/' + $scope.derechohabiente.IdDerechohabiente);
                }

                else if (response.data.Result === 1 && !response.data.Data) {
                    $location.path('Encuesta');
                }

                else if (response.data.Result === 2 || response.data.Result === -1) {
                    $log.warn("Ocurrió un error al almacenar consultar el verificar si existe un paquete promocional. ERR: " + response.data.Message);
                }
            })
            .catch(function (err) {
                $scope.message = err.data.error_description;
            });

        return promise;
    };

    ///Update Contact Information
    $scope.updateContactInformation = function (derechohabiente) {
        derechohabiente.Telefono = $scope.phoneNumber;
        derechohabiente.Lada = $scope.lada;
        derechohabiente.CorreoElectronico = $scope.mail;
        derechohabiente.RecibirInformacion = $scope.isReceiveInformation;

        DerechohabienteServiceFactory.updateDatosContactoDerechohabiente(derechohabiente)
            .then(function (response) {
                if (response.data.Result === 1) {
                    if (($scope.phoneNumber !== null && $scope.phoneNumber !== undefined) || ($scope.lada !== null && $scope.lada !== undefined) || ($scope.mail !== null && $scope.mail !== undefined)) {
                        $scope.init();

                        $scope.showTimedMsg("Los datos de contacto han sido guardados con éxito.", true, 3000);
                    }

                    else {
                        $scope.init();
                    }
                }

                else if (response.data.Result === 2 || response.data.Result === -1) {
                    $scope.showTimedMsg("No se han podido guardar los datos de contacto: " + response.data.Message, false, 3000);
                    $log.warn("Ocurrió un error al almacenar datos de contacto. ERR: " + response.data.Message);
                }
            })
            .catch(function (err) {
                $scope.message = err.data.error_description;
            });
    };

    ///Get Contact Information
    $scope.getContactInformation = function () {
        if ($scope.mail !== null && $scope.mail !== undefined) {
            $scope.regexIsValid = $scope.regexEmail.test($scope.mail);
        }

        if ($scope.derechohabiente.IdDerechohabiente === null) {
            localStorageService.remove('contactInformation');

            $scope.contactInformation = {
                Telefono: $scope.phoneNumber,
                Lada: $scope.lada,
                CorreoElectronico: $scope.mail,
                RecibirInformacion: $scope.isReceiveInformation,
                regexIsValid: $scope.regexIsValid
            };

            localStorageService.set('contactInformation', $scope.contactInformation);
        }
    };

    //Función para mostrar mensajes con delay y anclaje * pMessage-> Mensaje a mostrar, pSuccess -> true - mensaje de exito, false - mensaje de error, pTimeOut -> tiempo para borrar mensaje
    $scope.showTimedMsg = function (pMessage, pSuccess, pTimeOut) {
        $scope.goToAnchor("alertPanel");

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
    }

    //funcion para dirigirse a la ancla *id -> elemento al que se desea anclar
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

app.directive('inputNumero', [function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {

            var pattern = /[^0-9]*/g;

            function fromUser(text) {

                if (!text) {
                    return text;
                }

                var transformedInput = text.replace(pattern, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}]);

app.directive('inputEmail', [function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {

            var pattern = /[^0-9a-z@_ \-\/.#]*/g;

            function fromUser(text) {

                if (!text) {
                    return text;
                }

                var transformedInput = text.replace(pattern, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}]);