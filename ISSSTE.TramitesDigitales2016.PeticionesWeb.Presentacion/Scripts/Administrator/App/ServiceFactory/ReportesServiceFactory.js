'use strict';
angular.module(appName).factory('ReportesServiceFactory', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

    var serviceBase = $rootScope.baseUrl;
    var reporteServiceFactory = {};

    //var _getReporteEstatico = function (reporteEstatico) {

    //    var defered = $q.defer();
    //    var promise = defered.promise;

    //    $http({
    //        method: 'POST',
    //        url: serviceBase + '/api/Reportes/GetReporteEstatico',
    //        data: reporteEstatico,
    //        headers: {
    //            'Content-Type': 'application/json; charset=UTF-8'
    //        },
    //        responseType: 'arraybuffer'
    //    }).then(function (data) {
    //        defered.resolve(data);
    //    }).catch(function (err) {
    //        defered.reject(err);
    //    });

    //    return promise;
    //};

    var _getReporteEstatico = function (reporteEstatico) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(serviceBase + '/api/Reportes/GetReporteEstatico', reporteEstatico)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _getReporteDinamico = function (reporteDinamico) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(serviceBase + '/api/Reportes/GetReporteDinamico', reporteDinamico)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    //var _getReporteDinamico = function (reporteDinamico) {

    //    var defered = $q.defer();
    //    var promise = defered.promise;

    //    $http({
    //        method: 'POST',
    //        url: serviceBase + '/api/Reportes/GetReporteDinamico',
    //        data: reporteDinamico,
    //        headers: {
    //            'Content-Type': 'application/json; charset=UTF-8'
    //        },
    //        responseType: 'arraybuffer'
    //    }).then(function (data) {
    //        defered.resolve(data);
    //    }).catch(function (err) {
    //        defered.reject(err);
    //    });

    //    return promise;
    //};

    //var _getReporteDinamicoNP = function (reporteDinamico) {

    //    var config = {
    //        responseType: 'arraybuffer'
    //    };

    //    $http.post(serviceBase + '/api/Reportes/GetReporteDinamico', reporteDinamico, config).then(function (data) {
    //        var blob = new Blob([data.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //        saveAs(blob, "Reporte_Dinamico.xlsx");
    //    });
    //};

    //var _getReporteEstaticoNP = function (reporteEstatico) {

    //    $http({
    //        method: 'POST',
    //        url: serviceBase + '/api/Reportes/GetReporteEstatico',
    //        data: reporteEstatico,
    //        headers: {
    //            'Content-Type': 'application/json; charset=UTF-8'
    //        },
    //        responseType: 'arraybuffer'

    //    }).then(function (data) {

    //        var blob = new Blob([data.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8" });
    //        saveAs(blob, "Reporte_Estatico.xls");
    //    });

    //};

    reporteServiceFactory.getReporteEstatico = _getReporteEstatico;
    reporteServiceFactory.getReporteDinamico = _getReporteDinamico;
    //reporteServiceFactory.getReporteDinamicoNP = _getReporteDinamicoNP;
    //reporteServiceFactory.getReporteEstaticoNP = _getReporteEstaticoNP;

    return reporteServiceFactory;

}]);