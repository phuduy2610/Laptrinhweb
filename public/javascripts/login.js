$('document').ready(function () {
    $("#login-form").submit(function (e) {
        e.preventDefault();
        $.ajax({
            dataType: "json",
            url: "/login",
            type: "POST",
            data: $("#login-form").serialize(),
            success: function (data) {
                if(data.respond) {
                    window.location.href = "/user";
                } else {
                    if(data.redirect != null) {
                        window.location.href = data.redirect;
                    } else 
                    {
                        $("#loginAlert").addClass("failedLogin").html("Incorrect email or password.");
                    }
                }
            }
        })
    })
})