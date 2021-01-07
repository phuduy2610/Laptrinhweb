$("document").ready(function () {
    var delivery_method;
    $(".complete-payment-alert").hide();
    $(".complete-payment-fail").hide();
    $(".complete-payment").on("click", function () {
        let firstname = $("#firstName").val();
        let lastname = $("#lastName").val();
        let address = $("#address").val();
        if (delivery_method == '' || firstname == '' || address == ''||lastname == '') {
            $(".complete-payment-alert").hide();
            $(".complete-payment-fail").show();
        }
        else {
            $(".complete-payment-fail").hide();
            $(".complete-payment-alert").show();
            $.ajax({
                url: window.location.href,
                type: 'post',
                data: { delivery_method, firstname, lastname, address },
                success: function () {
                    console.log("succesfully");
                },
                error: function (e) {
                    console.log(e.message);
                }
            });
        }
        console.log('delivery:', delivery_method);
    })
    $(".delivery-method").on("click", function () {
        delivery_method = $(this).attr("id");
    })
    $(".complete-payment-close").on("click", function () {
        $(".complete-payment-alert").hide();
    })
    $(".complete-payment-fail-close").on("click", function () {
        $(".complete-payment-fail").hide();
    })
})