$(window).load(function () {
    console.log($("#quantity").val());
    $(".trigger_popup_fricc").click(function(){
       $('.hover_bkgr_fricc').show();
    //    $.ajax({
    //     url: window.location.href,
    //     type: 'post',
    //     data: { quant },
    //     success: function () {
    //         console.log("succesfully");
    //     },
    //     error: function (e) {
    //         console.log(e.message);
    //     }
    });
    });
    $('.hover_bkgr_fricc').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
});