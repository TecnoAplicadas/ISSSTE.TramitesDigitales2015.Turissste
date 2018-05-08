var REQUEST_ID_PARAM = "requestId";
var CATALOG_ITEM_KEY_PARAM = "catalogItemKey";
var JSON_CONTENT_TYPE = "application/json";
var FORM_CONTENT_TYPE = "application/x-www-form-urlencoded";
var BEARER_TOKEN_AUTHENTICATION_TEMPLATE = "Bearer {0}";

var Constants =
{
    accountRoutes: {
        logout: "account/logout?returnUrl={0}",
        softLogout: "account/logout?returnUrl={0}&soft=true",
        login: "account/login"
    },
    roles: {
        funeralAdvisor: "Asesor (Agencia Funeraria)",
        operationsManagement: "Jefe de operaciones (Agencia Funeraria)",
        processManagement: "Gestión de procesos"
    },
    reportFormats: {
        pdf: {
            Id: 5,
            Name: "PDF (*.pdf)"
        },
        excel: {
            Id: 4,
            Name: "Excel (*.xls)"
        }
    }
};
