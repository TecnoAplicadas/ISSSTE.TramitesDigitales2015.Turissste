'use strict';
angular.module(appName).controller('AdminPaquetesController', ['$scope', '$timeout', '$anchorScroll', '$location', 'PaquetesTuristicosServiceFactory', 'ConfiguracionServiceFactory', 'TipoDestinoServiceFactory', '$q', '$filter', 'rutaGlobalizadorInfo', function ($scope, $timeout, $anchorScroll, $location, PaquetesTuristicosServiceFactory, ConfiguracionServiceFactory, TipoDestinoServiceFactory, $q, $filter, rutaGlobalizadorInfo) {
    $scope.showLoadOptions = false;
    $scope.isExistPromotionalPackage = false;
    $scope.disableSaved = false;

    $scope.paqueteTuristico = {};
    $scope.selectedPackage = "";

    $scope.paquetesTuristicosList = [];
    $scope.tiposDestinoList = [];

    $scope.init = function () {
        $scope.rutaGlobalizador = rutaGlobalizadorInfo.data.Data;
        $scope.getPaquetesTuristicos();
        $scope.getTiposDestino();
        $scope.existsPaquetePromocional();
    };

    ///Get Paquetes Turisticos
    $scope.getPaquetesTuristicos = function () {
        PaquetesTuristicosServiceFactory.getPaquetesTuristicos()
           .then(function (response) {
               if (response.data.Result === 1) {
                   $scope.paquetesTuristicosList = response.data.Data;
               }

               else if (response.data.Result === 2 || response.data.Result === -1) {
                   $scope.showAlert = true;
                   $scope.message = response.data.Message;
               }
           })
           .catch(function (err) {
               $scope.message = err.data.error_description;
           });
    };

    ///Get Tipos Destino
    $scope.getTiposDestino = function () {
        TipoDestinoServiceFactory.getTiposDestino()
           .then(function (response) {
               if (response.data.Result === 1) {
                   $scope.tiposDestinoList = response.data.Data;
                   $scope.tiposDestinoList.push({
                       IdTipoDestino: 0,
                       Nombre: "--Seleccionar--",
                       Descripcion: "--Seleccionar--"
                   });
                   $scope.tipoDestino = $scope.tiposDestinoList[4];
               }

               else if (response.data.Result === 2 || response.data.Result === -1) {
                   $scope.showAlert = true;
                   $scope.message = response.data.Message;
               }
           })
           .catch(function (err) {
               $scope.message = err.data.error_description;
           });
    };

    ///Check If Destiny Type Exists
    $scope.checkIfDestiniTypeExists = function (tipoDestino) {
        $scope.destinyExists = $filter("filter")($scope.paquetesTuristicosList, { IdTipoDestino: tipoDestino.IdTipoDestino, Promocionado: false })[0];
        if ($scope.destinyExists === undefined) {
            $scope.disableSaved = false;
        }

        else if ($scope.destinyExists !== undefined) {
            if ($scope.paqueteTuristico.Promocionado) {
                $scope.disableSaved = false;
            }

            else {
                $scope.disableSaved = true;
                $scope.showTimedMsg("El tipo destino " + $scope.destinyExists.TipoDestino + " ya se encuentra asignado a un paquete.", false, 6000, false);
            }
        }
    };

    ///Check Promotional Destiny
    $scope.checkPromotionalDestiny = function (isPromotional) {
        if ($scope.destinyExists !== undefined && isPromotional) {
            $scope.disableSaved = $scope.destinyExists.Promocionado === false ? false : true;
        }

        else if ($scope.destinyExists !== undefined && !isPromotional) {
            $scope.disableSaved = $scope.destinyExists.Promocionado === false ? true : false;
            $scope.showTimedMsg("El tipo destino " + $scope.destinyExists.TipoDestino + " ya se encuentra asignado a un paquete.", false, 6000, false);
        }

        else if ($scope.destinyExists === undefined) {
            $scope.disableSaved = false;
        }
    };

    ///Exists Paquete Promocional
    $scope.existsPaquetePromocional = function () {
        PaquetesTuristicosServiceFactory.existsPaquetePromocional()
           .then(function (response) {
               if (response.data.Result === 1) {
                   $scope.isExistPromotionalPackage = response.data.Data;
               }

               else if (response.data.Result === 2 || response.data.Result === -1) {
                   $scope.showAlert = true;
                   $scope.message = response.data.Message;
               }
           })
           .catch(function (err) {
               $scope.message = err.data.error_description;
           });
    };

    ///Save Turist Package
    $scope.saveTuristPackage = function (form) {
        if ($scope.tipoDestino.IdTipoDestino === 0) {
            form.slctNewTipoDestino.$setValidity('required', false);
        }

        if (form.$valid) {
            $scope.paqueteTuristico.IdTipoDestino = $scope.tipoDestino.IdTipoDestino;
            $scope.paqueteTuristico.Imagen = $scope.nuevoPaqueteImagen.base64;

            $scope.addTuristPackage($scope.paqueteTuristico);

            form.txtNewNombre.$setUntouched();
            form.txtNewDescription.$setUntouched();

            form.txtNewNombre.$setPristine();
            form.txtNewDescription.$setPristine();

            form.slctNewTipoDestino.$setPristine();
            form.slctNewTipoDestino.$setPristine();

            form.myfile.$setPristine();
            form.myfile.$setPristine();

            angular.element("input[type='file']").val(null);

            $scope.showLoadOptions = false;
        }

        else {
            angular.forEach(form.$error.required, function (value, key) {
                value.$dirty = true;
            });
        }
    };

    ///Add Turist Package
    $scope.addTuristPackage = function (paqueteTuristico) {
        var defered = $q.defer();
        var promise = defered.promise;

        PaquetesTuristicosServiceFactory.addPaqueteTuristico(paqueteTuristico)
            .then(function (response) {
                defered.resolve(response);

                if (response.data.Result === 1) {
                    $scope.init();

                    $scope.showTimedMsg("El paquete turístico " + paqueteTuristico.Nombre + " ha sido almacenado con éxito.", true, 3000, false);

                    $scope.paqueteTuristico = {
                        Nombre: "",
                        Descripcion: ""
                    };

                    $scope.nuevoPaqueteImagen = {};
                }

                else if (response.data.Result === 2 || response.data.Result === -1) {
                    $scope.showTimedMsg("El paquete turístico " + paqueteTuristico.Nombre + " no pudo ser guardado. ERR: " + response.data.Message, false, 6000, true);
                }
            })
            .catch(function (err) {
                $scope.showTimedMsg("El paquete turístico " + paqueteTuristico.Nombre + " no pudo ser guardado. ERR: " + response.data.Message, false, 6000, true);
            });

        return promise;
    };

    //Funcion para mostrar la seccion de adicion de paquetes nuevos
    $scope.addNewTuristPackage = function () {
        if ($scope.showLoadOptions === true) {
            $scope.cancelPackage();
        }

        else {
            $scope.showLoadOptions = true;
            $scope.showLinkConfig = false;
        }
    };

    //Funcion para mostrar la seccion para la modificación del link del globalizador
    $scope.showLinkForm = function () {
        if ($scope.showLinkConfig === true) {
            $scope.cancelShowLink();
        }

        else {
            $scope.showLoadOptions = false;
            $scope.showLinkConfig = true;
        }
    };

    //Funcion para guardar el link del globalizador
    $scope.updateGlobLink = function () {
        ConfiguracionServiceFactory.updateConfiguration($scope.rutaGlobalizador).then(function (response) {
            if (response.data.Result === 1) {
                $scope.showTimedMsg("La ruta del globalizador ha sido cambiada con éxito.", true, 3000, false);
                $scope.showLinkConfig = false;
            }

            else {
                $scope.showTimedMsg("No se pudo actualizar la ruta del globalizador. ERR: " + response.data.Message, false, 3000, false);
            }
        });
    };

    //Funcion para mostrar mensajes de error/éxito, dirigirse a una ancla y limpiar dicho comentario    
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

    //Funcion para cancelar la carga de nuevo paquete turistico y ocultar la sección
    $scope.cancelPackage = function (form) {
        $scope.showLoadOptions = false;

        $scope.paqueteTuristico = {
            Nombre: "",
            Descripcion: ""
        };

        if (form !== undefined) {
            form.txtNewNombre.$setPristine();
            form.txtNewDescription.$setPristine();
            form.slctNewTipoDestino.$setPristine();
            form.myfile.$setPristine();

            $scope.nuevoPaqueteImagen = {};

            angular.element("input[type='file']").val(null);
        }

        $scope.tipoDestino = $scope.tiposDestinoList[4];

        $scope.disableSaved = false;
    };

    //Funcion para cancelar el cambio del link y ocultar dicha sección
    $scope.cancelShowLink = function () {
        $scope.showLinkConfig = false;
    };

    ///Retrieve Package By Id
    $scope.retrievePackageId = function (pPaqueteItem) {
        $scope.selectedPackage = pPaqueteItem;
        $scope.updatePaqueteNombre = pPaqueteItem.Nombre;
        $scope.updatePaqueteDescripcion = pPaqueteItem.Descripcion;
        $scope.updatePaqueteImagen = {
            base64: pPaqueteItem.Imagen
        }
    };

    ///Update Package
    $scope.updatePackage = function () {
        $scope.paqueteTuristicoActualizado = {
            IdPaqueteTuristico: $scope.selectedPackage.IdPaqueteTuristico,
            Nombre: $scope.updatePaqueteNombre,
            Descripcion: $scope.updatePaqueteDescripcion,
            Imagen: $scope.updatePaqueteImagen.base64,
            IdTipoDestino: $scope.selectedPackage.IdTipoDestino,
            Promocionado: $scope.selectedPackage.Promocionado
        };

        PaquetesTuristicosServiceFactory.updatePaqueteTuristico($scope.paqueteTuristicoActualizado).then(function (response) {
            if (response.data.Result === 1) {
                $("#playaModal").modal("hide");
                $scope.showTimedMsg("El paquete turístico " + $scope.paqueteTuristicoActualizado.Nombre + " ha sido actualizado con éxito.", true, 2000, false);

                $scope.init();
            }

            else {
                $("#playaModal").modal("hide");
                $scope.showTimedMsg("El paquete turístico" + $scope.paqueteTuristicoActualizado.Nombre + " no pudo ser actualizado. ERR: " + response.data.Message, false, 3000, true);
            }
        });
    };

    //Función para dirigir el focus a una "ancla", Params: id-> id del elemento html que funge como anclaje
    $scope.goToAnchor = function (id) {
        var newHash = id;
        if ($location.hash() !== newHash) {
            $location.hash(id);
        } else {
            $anchorScroll();
        }
    };

    $scope.init();
}]);

//Directiva para evitar que se ingresen caracteres inválidos en los textbox
angular.module(appName).directive('inputLetras', [function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {

            var pattern = /[^0-9a-zA-Z ñÑ]*/g;

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