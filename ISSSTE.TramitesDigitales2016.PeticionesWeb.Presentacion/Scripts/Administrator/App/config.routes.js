var Routes = {
    packages: {
        url: '/packages',
        templateUrl: 'Scripts/Administrator/App/catalogs/packages.html',
        roles: [Constants.roles.operationsManagement]
    },
    editionPackages: {
        url: '/packages/change',
        templateUrl: 'Scripts/Administrator/App/catalogs/editionPackage.html',
        roles: [Constants.roles.operationsManagement]
    },
    products: {
        url: '/products',
        templateUrl: 'Scripts/Administrator/App/catalogs/products.html',
        roles: [Constants.roles.funeralAdvisor,Constants.roles.operationsManagement]
    },
    quotes: {
        url: '/quotes',
        templateUrl: 'Scripts/Administrator/App/catalogs/searchQuotes.html',
        roles: [Constants.roles.funeralAdvisor, Constants.roles.operationsManagement]
    },
    quoteDetail: {
        url: '/quoteDetail',
        templateUrl: 'Scripts/Administrator/App/catalogs/quoteDetail.html',
        roles: [Constants.roles.funeralAdvisor, Constants.roles.operationsManagement]
    },
    indicators: {
        url: '/indicators',
        templateUrl: 'Scripts/Administrator/App/indicators/report.html',
        roles: [Constants.roles.processManagement]
    },    
    support: {
        url: '/support',
        templateUrl: 'Scripts/Administrator/App/support/support.html',
        roles: [Constants.roles.funeralAdvisor, Constants.roles.operationsManagement]
    }
}