'use strict';
app.factory('CommonServiceFactory', ['$q', '$rootScope', '$timeout', function ($q, $rootScope, $timeout) {

    var commonServiceFactory = {};

    function _getBaseUrl() {
            return UI.getBaseUrl();
        }
    
    commonServiceFactory.getBaseUrl = _getBaseUrl;

    return commonServiceFactory;
}]);