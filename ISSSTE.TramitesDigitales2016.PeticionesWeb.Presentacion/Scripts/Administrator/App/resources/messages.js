var Messages = {
    error: {
        statusList: "Ocurri&oacute; un error al obtener la lista de estatus.",
        requests: "Ocurri&oacute; un error al consultar las solicitudes.",
        requestDetail: "Ocurri&oacute; un error al obtener el detalle de la solicitud.",
        nextStatus: "Ocurri&oacute; un error al obtener la lista de estatus siguientes para la solicitud.",
        requestNotReviewd: "Te faltan algunas cosas, aseg&uacute;rate de revisarlas para poder continuar.",
        holderDocumentsNotReviewed: "Todav&iacute;a tienes documentos del titular sin revisar.",
        beneficiaryDocumentsNotReviewed: "Todav&iacute;a tienes documentos del beneficiario {0} sin revisar.",
        nextStatusNotSelected: "Todav&iacute;a no has seleccionado el siguiente estatus de la solicitud.",
        validateDocuments: "Ocurri&oacute; un error al actualizar el estado de los documentos de la solicitud, int&eacute;ntalo nuevamente.",
        updateRequest: "Ocurri&oacute; un error al pasar la solicitud al siguiente estatus, vu&eacute;lvelo a intentar.",
        catalogList: "Ocurri&oacute; un error al obtener el listado de elementos del cat&aacute;logo.",
        catalogItemDetail: "Ocurri&oacute; un error al obtener el detalle del elemento del cat&aacute;logo.",
        addOrUpdateItem: "Ocurri&oacute; un error al guardar los cambios, int&eacute;ntalo nuevamente.",
        gettingPackages:"Ocurri&oacute; un error al obtener la lista de paquetes configurados.",
        updatingPackages:"Ocurri&oacute; un error mientras se actualizaba un paquete.",
        creatingPackages: "Ocurri&oacute; un error mientras se daba de alta un paquete.",
        gettingTypesProduct:"Ocurri&oacute; un error mientras se recuperaban las categor&iacute;as de producto.",
        addingTypesProduct:"Ocurri&oacute; un error mientras se agregaba un tipo de producto al paquete.",
        removingTypesProduct:"Ocurri&oacute; un error mientras se remov&iacute;a el tipo de producto del paquete.",
        loadingProductsFromSirvel:"Ocurri&oacute; un error al cargar los productos al sistema de tr&aacute;mites digitales.",
        showingAvailableProducts:"Ocurri&oacute; un error intentando mostrar los productos disponibles.",
        addingImageToProduct:"Ocurri&oacute; un error al agregar una imagen al producto.",
        removingImageFromProduct: "Ocurri&oacute; un error mientras se eliminaba la imagen del producto.",
        gettingQuotes: "Ocurri&oacute; un error mientras se consultaban las cotizaciones con los criterios seleccionados.",
        gettingQuote:"Ocurri&oacute; un error mientras se recuperaba la cotizaci&oacute;n.",
        entitleIsssteNumber: "Ocurri&oacute; un error al obtener los datos del derechohabiente.",
        entitleNotFound: "No encontramos informaci&oacute;n de alg&uacute;n derechohabiente que coincida con la informaci&oacute;n que ingresaste.",
        markingAsAcquired:"Ocurri&oacute; un error mientras se realizaba el cambio de estatus a cotizaci&oacute;n adquirida."
    },
    success: {
        catalogItemUpdated: "Cambios guardados correctamente.",
        entitleApplicationLaunched: "Hemos abierto una pestaña nueva para que puedas ayudarle al usuario con su tr&aacute;mite."
    },
    info: {
        controllerLoaded: "Controller loaded.",
        workingOnItToggle: "Working on it toogled.",
        navigationMenuOverrided: "Navigation menu overrided.",
        changeRequestId: "Requestid changed.",
        yes: "Si",
        no: "No"
    },
    validation: {
        required: 'El campo es requerido.',
        email: 'El formato de un correo eletr&oacute;nico es "nombre@dominio.com".',
        numbers: 'Debe de introducir &uacute;nicamente n&uacute;meros.',
        minLenght: 'La longitud del campo debe de ser por lo menos de {0} caracteres.',
        rfc: 'Aseg&uacute;rese de cumplir el formato del RFC.',
        curp: 'Aseg&uacute;rese de cumplir el formato de la CURP.'
    }
};