$gmx(document).ready(function () {

    //Codigo para mostrar el datapicker
    $('#hechosdatePicker').datepicker({ changeYear: true, maxDate: 0 });
    $('[data-toggle="tooltip"]').tooltip();

    //Invocacion de la medición de formulario
    new ns_.Form("ID_requestForm", "*");

}); 


