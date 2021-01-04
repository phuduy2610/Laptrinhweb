$('document').ready(function () {
    $("#forgotForm").submit(function (e) {
        clearForgotAlert();
        e.preventDefault();
        $.ajax({
            dataType: "json",
            url: "/forgot",
            type: "POST",
            data: $("#forgotForm").serialize(),
            success: function (data) {
                if(data.respond) {
                    $("#forgotAlert").addClass("forgotSuccessAlert").html("An email have been sent to your email. Please check your email to reset your account.");
                    clearInput();
                } else {
                    $("#forgotAlert").addClass("forgotErrorAlert").html("This account doesn't exist. Please register to use our services.");
                    clearInput();
                }
            }
        })
    })
    function clearForgotAlert() {
        $("#forgotAlert").removeClass("forgotSuccessAlert").removeClass("forgotErrorAlert").html("");
    }
    function clearInput() {
        $("#email").val('');
    }
})