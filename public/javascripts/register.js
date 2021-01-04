$('document').ready(function(){
    let respond; // get respond from server if registered successful
    let valid = false;
    $("#registerForm").submit(function(e){
        clearRegisterAlert();
        let retype = $("#retype-password").val();
        let password = $("#password").val();
        if(retype === password && valid == true)
        {
            e.preventDefault();
            $.ajax({
                dataType: "json",
                url: "/register",
                type: "POST",
                data: $("#registerForm").serialize(),
                success: function(data) {
                    respond = parseInt(data.respond);
                    if(!respond) {
                        $("#registerAlert").addClass("registerErrorAlert").html("Error: server problem. Please try again.");
                        clearInput();
                        clearEmailAlert();
                        clearRetypeAlert();
                    } else {
                        $("#registerAlert").addClass("registerSuccessAlert").html("An email have been sent to your email. Please check your email to validate your account.");
                        valid = false;
                        clearInput();
                        clearEmailAlert();
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

    $("#email").change(function(){

        let value = $("#email").val();

        if(value!='')
        {
            $.getJSON('/api/user/is-exist', {email: value},function(data){
                if(data){
                    $("#email-validity").removeClass("not").addClass("exist").html("This email is already registered");
                    valid = false;
                }
                else
                { 
                    $("#email-validity").removeClass("exist").addClass("not").html("This email is available");
                    valid = true;
                }
            })
        }
        else
        {
            clearEmailAlert();
        }
    })

    
    $("#retype-password").change(function(){

        let retype = $("#retype-password").val();
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

    function clearRetypeAlert() {
        $("#passwordAlert").removeClass("passwordNotAlert").removeClass("passwordMatchedAlert").html("");
    }

    function clearEmailAlert() {
        $("#email-validity").removeClass("exist").removeClass("not").html("");
    }

    function clearInput() {
        $("#retype-password").val('');
        $("#password").val('');
        $("#email").val('');
        $("#username").val('');
    }

    function clearRegisterAlert() {
        $("#registerAlert").removeClass("registerSuccessAlert").removeClass("registerErrorAlert").html("");
    }
})