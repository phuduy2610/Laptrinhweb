$('document').ready(function(){
    let respond; // get respond from server if registered successful
    $("#registerSubmit").click(function(e){
        e.preventDefault();
        retype = $("#retype-password").val();
        password = $("#password").val();
        if(retype == password)
        {
            $.ajax({
                dataType: "json",
                url: "/register",
                type: "POST",
                data: $("#registerForm").serialize(),
                success: function(data) {
                    respond = parseInt(data.respond);
                    if(!respond) {
                        $("#registerAlert").addClass("registerAlert").html("Error: server problem. Please try again.");
                    }
                }
            })
        }
    })

    $("#email").change(function(){
        $.getJSON('/api/is-exist',$("#email").val(),function(data){
            if(data){
                console.log("exist");
            }
            else
            {
                console.log("not");
            }
        })
    })
})