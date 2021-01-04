$('document').ready(function() {
    $("#resetForm").submit(function(e){
        clearResetAlert();
        let retype = $("#retype").val();
        let password = $("#password").val();
        if(retype === password)
        {
            e.preventDefault();
            $.ajax({
                dataType: "json",
                url: window.location.href,
                type: "POST",
                data: $("#resetForm").serialize(),
                success: function(data) {
                    respond = parseInt(data.respond);
                    if(!respond) {
                        $("#resetAlert").addClass("resetErrorAlert").addClass("").html("Error: Link is invalid or timed out. Please request another from.");
                        clearInput();
                        clearRetypeAlert();
                    } else {
                        $("#resetAlert").addClass("resetSuccessAlert").html("Your password has been changed successfully. Please go back to our website to login.");
                        clearInput();
                        clearRetypeAlert();
                    }
                }
            })
        }
        else
        {
            e.preventDefault();
        }

    })

    $("#retype").change(function(){

        let retype = $("#retype").val();
        let password = $("#password").val();
        if(retype != password) {
            $("#passwordAlert").removeClass("passwordMatchedAlert").addClass("passwordNotAlert").html("Retype password is not matched.");
        }
        else {
            $("#passwordAlert").removeClass("passwordNotAlert").addClass("passwordMatchedAlert").html("Retype password is matched.");
        }
        if(retype ==""){
            clearRetypeAlert();
        }
    })

    function clearInput() {
        $("#retype").val('');
        $("#password").val('');
    }

    function clearResetAlert() {
        $("#resetAlert").removeClass("resetErrorAlert").removeClass("resetErrorAlert").html("");
    }

    function clearRetypeAlert() {
        $("#passwordAlert").removeClass("passwordNotAlert").removeClass("passwordMatchedAlert").html("");
    }
})
