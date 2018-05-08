(function () {

    var appMod = angular.module('requestForm').component('requestForm', []);

    appMod.directive('capitalize', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {

                    if (inputValue === undefined) {
                        inputValue = '';
                    }
                    
                    var capitalized = inputValue.toUpperCase();

                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]);
            }
        }
    });

    appMod.directive('inputNumero', [function () {
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

    appMod.directive('inputLetras', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {

                var pattern = /[^a-zA-Z ñÑ]*/g;

                function fromUser(text) {

                    if (!text) {
                        return text;
                    }

                    var transformedInput = text.replace(pattern, '').toUpperCase();
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

    appMod.directive('inputMixed', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {

                var pattern = /[^a-zA-Z0-9]*/g;

                function fromUser(text) {

                    if (!text) {
                        return text;
                    }

                    var transformedInput = text.replace(pattern, '').toUpperCase();
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

    appMod.directive('inputDescription', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {

                var pattern = /[^0-9a-zA-Z,.\\()$%#@*\-+=¿?!¡ \/ñÑ]*/g;

                function fromUser(text) {

                    if (!text) {
                        return text;
                    }

                    var transformedInput = text.replace(pattern, '').toUpperCase();
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

    appMod.directive('inputDireccion', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {

                var pattern = /[^0-9a-zA-Z \-\/.#]*/g;

                function fromUser(text) {

                    if (!text) {
                        return text;
                    }

                    var transformedInput = text.replace(pattern, '').toUpperCase();
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

    appMod.directive('inputEmail', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {

                var pattern = /[^0-9a-zA-Z@_ \-\/.#]*/g;

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

    appMod.controller('RequestController', ['$q','$http','$window', '$filter', '$anchorScroll', '$location', '$timeout' ,function ($q, $http, $window, $filter, $anchorScroll, $location, $timeout) {
        
        var vm = this; //Alias
        vm.errorList = [];
        vm.successMessage = "";
        vm.sent = false;
        vm.sentPromise = "";
        vm.requestFolio = "";

        //Campos de la petición

        vm.userData = {
            requesterCurp: '',
            requesterRfc: '',
            requesterName: '',
            requesterFirstName: '',
            requesterSecondName: '',
            requesterGender: '1',
            rightholderType: '',
            requesterZipCode: '',
            requesterState: '',
            requesterMunicipal: '',
            requesterColony: '',
            requesterStreet: '',
            requesterExtNumber: '',
            requesterIntNumber: '',
            requesterLada: '',
            requesterFixedPhone: '',
            requesterMobilPhone: '',
            requesterEmail: '',
            affectedCurp: '',
            affectedRfc: '',
            affectedName: '',
            affectedFirstName: '',
            affectedSecondName: '',
            affectedGender: '1',
            affectedRightholderType: '',
            affectedPhone: '',
            affectedEmail: '',
            petitionArea: '',
            requestDelegation: '',
            requestUnit: '',
            requestOpinion: '',
            requestSubject: '',
            requestDate: $filter("date")(Date.now(), 'dd/MM/yyyy'),
            requestPlace: '',
            requestDescription: '',
            needAfected: 'YES'
        };

        //Inicialización de colecciones

        vm.gendersColl = [];
        vm.rightholderColl = [];
        vm.requestAreaColl = [];
        vm.requestDelColl = [];
        vm.requestUnitColl = [];
        vm.opinionTypeColl = [];
        vm.subjectCauseColl = [];
        vm.requestPlaceColl = [];
        vm.colonyColl = [];

        //Regex para validacion

        vm.regexSoloNumeros = /^\d+$/;
        vm.regexSoloLetras = /^[A-Z Ñ]+$/;
        vm.regexRFC = /^[A-Z]{3,4}(\d{6})((\D|\d){3})?$/;
        vm.regexCURP = /^([A-Z]{4})([0-9]{6})([A-Z]{6})([0-9]{2})$/;
        vm.regexCodigoPostal = /^[0-9]{5}$/;
        vm.regexTextoLibre = /^[0-9A-Z., Ñ]+$/;
        vm.regexTxtLibreOpc = /^[0-9A-Z., Ñ]*$/;
        vm.regexTelefono = /^[0-9 -]+$/;
        vm.regexEmail = /^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]{2,3}(\.[a-zA-Z]{2,3})*$/;

        //Promesas
        var promiseRightholderColl = $http.get('../SolicitudPeticion/GetTipoDerechoabiente'); //Catálogo de tipo de derechohabiente
        var promiseAreaColl = $http.get('../SolicitudPeticion/GetUnidadAdministrativa'); //Catálogo de Areas
        var promiseDelColl = $http.get('../SolicitudPeticion/GetDelegacionHospitales'); // Catálogo de Delegaciones
        var promiseOpinionColl = $http.get('../SolicitudPeticion/GetTipoOpinion'); //Catálogo de Opiniones
        var promisePlaceColl = $http.get('../SolicitudPeticion/GetServicioHechos'); //Catálogo de Lugares
        
        //Ejecutar promesas
        $q.all([promiseRightholderColl, promiseAreaColl, promiseDelColl, promiseOpinionColl, promisePlaceColl]).then(function (data) {

            vm.rightholderColl = data[0].data;
            vm.requestAreaColl = data[1].data;
            vm.requestDelColl = data[2].data;
            vm.opinionTypeColl = data[3].data;
            vm.requestPlaceColl = data[4].data;
        });

        //Metodo para obtener el catalogo de Colonia / Estado / Delegacion o municipio
        vm.resetError = function () {
            vm.errorList = [];
        }

        vm.resetSuccess = function () {
            vm.requestFolio = "";
            $window.location.reload();
        }

        vm.resetForm = function () {
            $window.location.reload();
        }

        vm.getZipInfo = function (value) {

                if (value !== undefined && value.length === 5) {
                    var data = { zipCode: value };
                    var statePromise = $http.post('../SolicitudPeticion/GetEstadoCP', data);
                    var delMunPromise = $http.post('../SolicitudPeticion/GetMunicipio', data);
                    var colonyPromise = $http.post('../SolicitudPeticion/PoblacionesOColoniasCodigoPostal', data);

                    $q.all([statePromise, delMunPromise, colonyPromise]).then(function (response) {
                        if (response[0].data.length === 0) {
                            vm.errorList = [];
                            vm.errorList.push("No se encontró el codigo postal.");
                            vm.goToAnchor("infoPanel");
                            $timeout(vm.resetError, 120000);
                        } else {
                            vm.userData.requesterState = response[0].data[0].Nombre;
                            vm.userData.requesterMunicipal = response[1].data[0].Nombre;
                            vm.colonyColl = response[2].data;
                        }

                    }, function (response) {
                        vm.errorList = [];
                        vm.errorList.push("No se pudo recuperar algun catalogo.");
                        vm.goToAnchor("infoPanel");
                        $timeout(vm.resetError, 120000);
                    });
                }
            
        }

        //Metodo para obtener el catalogo de nombre de la unidad
        vm.setRequesterRFC = function (pCURP) {
            if(pCURP!== undefined && pCURP.length === 18){
                vm.userData.requesterRfc = pCURP.substring(0, 10);
            }
        }
        
        vm.setAffectedRFC = function (pCURP) {
            if (pCURP !== undefined && pCURP.length === 18) {
                vm.userData.affectedRfc = pCURP.substring(0, 10);
            }
        }
        

        vm.getUnitColl = function (pIdArea, pIdDelegation) {
            vm.requestUnitColl = [];

            if (pIdArea !== undefined && pIdDelegation !== undefined) {

                var data = {
                    pIdUnidadAdministrativa: pIdDelegation,
                    pIdTipoUps: pIdArea
                };

                $http.post('../SolicitudPeticion/GetUnidPrestServ', data).then(function (response) {
                    vm.requestUnitColl = response.data;
                }, function (response) {
                    vm.errorList = [];
                    vm.errorList.push("No se pudo obtener catalogo de unidades.");
                    vm.goToAnchor("infoPanel");
                    $timeout(vm.resetError, 120000);
                });
            }    
        }

        //Metodo para obtener catalogo de causa del asunto
        vm.getCauseColl = function (pIdTipoOpinion) {
            
            vm.subjectCauseColl = [];

            var data = {
                idTipoOpinion: pIdTipoOpinion
            };

            vm.causePromise = $http.post('../SolicitudPeticion/GetCausaAsunto', data).then(function (response) {
                vm.subjectCauseColl = response.data;
            }, function (response) {
                vm.errorList = [];
                vm.errorList.push("No se pudo recuperar catalogo de causas del asunto.");
                vm.goToAnchor("infoPanel");
                $timeout(vm.resetError, 120000);
            });
        }

        vm.mapName = function (elementName) {

            var mapedName = "";

            switch (elementName) {
                case "curpPetTxt":
                    mapedName = "Clave única de registro de población";
                    break;
                case "rfcPetTxt":
                    mapedName = "Registro federal de contribuyente";
                    break;
                case "nombreTxt":
                    mapedName = "Nombre del peticionario";
                    break;
                case "apPaternoTxt":
                    mapedName = "Apellido paterno del peticionario";
                    break;
                case "apMaternoTxt":
                    mapedName = "Apellido materno del peticionario";
                    break;
                case "sexoSlct":
                    mapedName = "Sexo del peticionario";
                    break;
                case "tipoDerSlct":
                    mapedName = "Tipo de derechohabiente del peticionario";
                    break;
                case "codPostTxt":
                    mapedName = "Código postal";
                    break;
                case "estadoSlct":
                    mapedName = "Estado";
                    break;
                case "municipioSlct":
                    mapedName = "Municipio";
                    break;
                case "coloniaTxt":
                    mapedName = "Colonia";
                    break;
                case "calleTxt":
                    mapedName = "Calle";
                    break;
                case "numExtTxt":
                    mapedName = "Número exterior";
                    break;
                case "numIntTxt":
                    mapedName = "Número interior";
                    break;
                case "ladaTxt":
                    mapedName = "Lada";
                    break;
                case "telefTxt":
                    mapedName = "Teléfono fijo";
                    break;
                case "celTxt":
                    mapedName = "Teléfono móvil";
                    break;
                case "emailTxt":
                    mapedName = "Correo electrónico del peticionario";
                    break;
                case "curpAfectadoTxt":
                    mapedName = "CURP del afectado";
                    break;
                case "rfcAfectadoTxt":
                    mapedName = "RFC del afectado";
                    break;
                case "afecNomTxt":
                    mapedName = "Nombre del afectado";
                    break;
                case "afecApPatTxt":
                    mapedName = "Apellido paterno del afectado";
                    break;
                case "afecApMatTxt":
                    mapedName = "Apellido materno del afectado";
                    break;
                case "afecSexoSlct":
                    mapedName = "Sexo del afectado";
                    break;
                case "afecTipoDerSlct":
                    mapedName = "Tipo de derechohabiente del afectado";
                    break;
                case "afecTelTxt":
                    mapedName = "Teléfono del afectado";
                    break;
                case "afecEmailTxt":
                    mapedName = "Correo electrónico del afectado";
                    break;
                case "areaPeticionSlct":
                    mapedName = "Área a donde corresponde la petición";
                    break;
                case "delPeticionSlct":
                    mapedName = "Delegación/Hospitales";
                    break;
                case "unidadPeticionSlct":
                    mapedName = "Nombre de la unidad";
                    break;
                case "opinionPetSlct":
                    mapedName = "Tipo de opinión";
                    break;
                case "asuntoPetSlct":
                    mapedName = "Causa del asunto";
                    break;
                case "hechosdatePicker":
                    mapedName = "Fecha de los hechos";
                    break;
                case "servicioHechoSlct":
                    mapedName = "Servicios donde ocurrieron los hechos";
                    break;
                case "descTxtArea":
                    mapedName = "Descripción";
                    break;
                default:
                    mapedName = elementName;
            }

            return mapedName;
        }

        //Enviamos formulario
        vm.goToAnchor = function (id) {
            var newHash = id;

            if ($location.hash() !== newHash) {
                $location.hash(id);
            } else {
                $anchorScroll();
            }     
        }

        vm.submitForm = function (form) {
            var captchaValidation = grecaptcha.getResponse();

            if (form.$valid) {

                var affectedLadaAux = form.afecLadaTxt === undefined ? "" : form.afecLadaTxt.$modelValue;
                var affectedPhoneAux = form.afecTelTxt === undefined ? "" : form.afecTelTxt.$modelValue;

                if (captchaValidation.length === 0) {

                    vm.errorList = [];
                    vm.errorList.push("El captcha no ha sido resuelto.");
                    vm.goToAnchor("infoPanel");
                    $timeout(vm.resetError, 120000);
                } else {

                    vm.sent = true;
                    vm.errorList = [];

                    dataPost = {
                        RequesterCURP: form.curpPetTxt.$modelValue,
                        RequesterRFC: form.rfcPetTxt.$modelValue,
                        RequesterName: form.nombreTxt.$modelValue,
                        RequesterFirstName: form.apPaternoTxt.$modelValue,
                        RequesterLastName: form.apMaternoTxt.$modelValue,
                        RequesterGender: form.rdGenero.$modelValue,
                        RequesterRightHolderType: form.tipoDerSlct.$modelValue.IdTipoDerechohabiente,
                        RequesterColony: form.coloniaTxt.$modelValue.IdPoblacionOColonia,
                        RequesterStreet: form.calleTxt.$modelValue,
                        ExtNumber: form.numExtTxt.$modelValue,
                        IntNumber: form.numIntTxt.$modelValue,
                        RequesterLada: form.ladaTxt.$modelValue,
                        RequesterFixedPhone: form.telefTxt.$modelValue,
                        RequesterMobilPhone: form.celTxt.$modelValue,
                        RequesterEmail: form.emailTxt.$modelValue,
                        AffectedCurp: form.curpAfectadoTxt === undefined ? "" : form.curpAfectadoTxt.$modelValue,
                        AffectedRfc: form.rfcAfectadoTxt === undefined ? "" : form.rfcAfectadoTxt.$modelValue,
                        AffectedName: form.afecNomTxt === undefined ? "" : form.afecNomTxt.$modelValue,
                        AffectedFirstName: form.afecApPatTxt === undefined ? "" : form.afecApPatTxt.$modelValue,
                        AffectedLastName: form.afecApMatTxt === undefined ? "" : form.afecApMatTxt.$modelValue,
                        AffectedGender: form.rdGeneroAffec === undefined ? "" : form.rdGeneroAffec.$modelValue,
                        AffectedRightHolderType: form.afecTipoDerSlct === undefined ? "" : form.afecTipoDerSlct.$modelValue.IdTipoDerechohabiente,
                        AffectedPhoneNumber: affectedLadaAux + affectedPhoneAux,
                        AffectedEmail: form.afecEmailTxt === undefined ? "" : form.afecEmailTxt.$modelValue,
                        UPS: form.unidadPeticionSlct.$modelValue.IdUnidadPrestadoraServicio,
                        ServicioHecho: form.servicioHechoSlct.$modelValue.IdServicioHecho,
                        CausaAsunto: form.asuntoPetSlct.$modelValue.IdCausaAsunto,
                        FechaHechos: form.hechosdatePicker.$modelValue,
                        Description: form.descTxtArea.$modelValue
                    };
                    
                    vm.goToAnchor("infoPanel");

                    vm.sentPromise = $http.post('../SolicitudPeticion/GuardarPeticion', dataPost).then(function (response) {

                        vm.requestFolio = response.data[0].Folio;
                        vm.goToAnchor("infoPanel");
                        startEncuestaHC(3000, "ISSSTE-05-001");
                        $timeout(vm.resetSuccess, 150000);
                        
                    }, function (response) {
                        vm.errorList = [];
                        vm.errorList.push("Ocurrió un error: " + response.data + "/n/n" + response.status);
                        vm.goToAnchor("infoPanel");
                        $timeout(vm.resetError, 120000);
                    });
                }
            } else {
                vm.errorList = [];
                vm.errorList.push("No has llenado todos la campos requeridos. Por favor verificalo.");

                angular.forEach(form.$error.required, function (value, key) {
                    value.$dirty=true;
                });

                vm.goToAnchor("infoPanel");
                $timeout(vm.resetError, 120000);
            }   
        }

    }]);

})();


    