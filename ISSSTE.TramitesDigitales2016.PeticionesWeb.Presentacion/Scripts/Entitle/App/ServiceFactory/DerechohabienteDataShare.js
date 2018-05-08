'use strict';
app.factory('DerechohabienteDataShare', function () {

    var derechohabientePool = {};
    var entitleSuccessMsg = {};
    var entitleErrorMsg = {};
    var otorgamientoUrl = {};

    function addDerechohabiente(pDerechohabiente) {
        derechohabientePool = pDerechohabiente;
    }

    function getDerechohabiente() {
        return derechohabientePool;
    }

    function setSuccessMessage(pSuccessMsg) {
        entitleSuccessMsg = {
            message: pSuccessMsg
        }
    }

    function getSuccessMessage() {
        return entitleSuccessMsg;
    }

    function setErrorMessage(pErrorMsg) {
        entitleErrorMsg = {
            message: pErrorMsg
        }
    }

    function getErrorMessage() {
        return entitleErrorMsg;
    }

    function clearSuccessMessage() {
        entitleSuccessMsg = {
            message: ''
        };
    }

    function clearErrorMessage() {
        entitleErrorMsg = {
            message: ''
        };
    }

    return {
        addDerechohabiente: addDerechohabiente,
        getDerechohabiente: getDerechohabiente,
        setSuccessMessage: setSuccessMessage,
        getSuccessMessage: getSuccessMessage,
        setErrorMessage: setErrorMessage
    };

});