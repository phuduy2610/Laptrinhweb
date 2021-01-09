$("document").ready(function () {
    $(".trigger_popup_fricc").click(function(event){
        //event.preventDefault();
        let quantity = $("#quantity").val();
        console.log('quantity',quantity);
        $('.hover_bkgr_fricc').show();
        $.ajax({
            url: window.location.href,
            type: 'post',
            data: {quantity},
            success: function () {
                console.log("succesfully");
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    });
    $('.hover_bkgr_fricc').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
});