$(document).ready(function () {

    /* Making sure only one of the collapsable things is non-collapsed at a time */
    $("#collapse-edit").on("show.bs.collapse", function () {
        $("#collapse-new").collapse('hide');
        $("#collapse-change").collapse('hide');
        document.getElementById("collapse-wrapper").style.opacity = "1"; 
    });
    $("#collapse-change").on("show.bs.collapse", function () {
        $("#collapse-new").collapse('hide');
        $("#collapse-edit").collapse('hide');
    });
    $("#collapse-new").on("show.bs.collapse", function () {
        $("#collapse-edit").collapse('hide');
        $("#collapse-change").collapse('hide');
    });


    /* So that those users who quicky click buttons do not make two collapsables open at the same time 
       Extra check that only one of the collapsable is open at a time */
       $("#collapse-edit").on("shown.bs.collapse", function () {
        $("#collapse-new").collapse('hide');
        $("#collapse-change").collapse('hide');
    });
    $("#collapse-change").on("shown.bs.collapse", function () {
        $("#collapse-new").collapse('hide');
        $("#collapse-edit").collapse('hide');
    });
    $("#collapse-new").on("shown.bs.collapse", function () {
        $("#collapse-edit").collapse('hide');
        $("#collapse-change").collapse('hide');
    });

    $("#verification-code").on("shown.bs.collapse", function () {
        $("#verification-button").html('Resend Verification Code');
    });


    $("#collapse-edit").on("hidden.bs.collapse", function () {
        document.getElementById("collapse-wrapper").style.opacity = "0";
    });

    $("#collapse-change").on("hidden.bs.collapse", function () {
        document.getElementById("collapse-wrapper").style.opacity = "0";
    });
    $("#collapse-new").on("hidden.bs.collapse", function () {
        document.getElementById("collapse-wrapper").style.opacity = "0";
    });


});