localStorage.clear();

$(document).ready(function(){

    $("#eyebtn").mousedown(function(){
        $(".fa").removeClass("fa-eye-slash").addClass("fa-eye");
        $("#txtPassword").prop("type", "text");
    })
    $("#eyebtn").mouseup(function(){
        $(".fa").addClass("fa-eye-slash").removeClass("fa-eye");
        $("#txtPassword").prop("type", "password");
    })

    $("#eyebtnLogin").mousedown(function(){
        $(".fa").removeClass("fa-eye-slash").addClass("fa-eye");
        $("#txtLoginPassword").prop("type", "text");
    })
    $("#eyebtnLogin").mouseup(function(){
        $(".fa").addClass("fa-eye-slash").removeClass("fa-eye");
        $("#txtLoginPassword").prop("type", "password");
    })
    
    //---------------VALIDATIONS SIGNUP MODAL--------------
    var flagEmail = false, flagPassword = false, flagMobile = false;

    //1. Email
    $("#txtEmail").blur(function(){
        var email = $(this).val();
        var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email == ""){
            $("#errEmail").html("Please fill your Email id");
            flagEmail = false;
        }
        else if(regexEmail.test(email) == false){
            $("#errEmail").html("Please fill valid Email id");
            flagEmail = false;
        }
        else{
            $("#errEmail").html("");
            flagEmail = true;
        }
    });

    //2. Password
    $("#txtPassword").blur(function(){
        var pass = $(this).val();
        var regexPass = /^[A-Za-z]\w{7,14}$/;
        if(pass == ""){
            $("#errPassword").html("Please fill a password");
            flagPassword = false;
        }
        else if(regexPass.test(pass) == false){
            $("#errPassword").html("password must be between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter");
            flagPassword = false;
        }
        else{
            $("#errPassword").html("");
            flagPassword = true;
        }
    });

    //3. Mobile
    $("#txtMobile").blur(function(){
        var mobile = $(this).val();
        var regexMobile = /^[6-9]{1}[0-9]{9}$/;
        if(mobile == ""){
            $("#errMobile").html("Please fill your mobile number");
            flagMobile = false;
        }
        else if(regexMobile.test(mobile) == false){
            $("#errMobile").html("Please fill valid mobile number");
            flagMobile = false;
        }
        else{
            $("#errMobile").html("");
            flagMobile = true;
        }
    });

    //4. Type
    $("#selectUser").change(function(){
        $("#errUser").html("");
    });

    //--------------REGISTER ONLY AFTER VALIDATIONS------
    $("#btnSignup").click(function(event){
        //email
        if($("#txtEmail").val() == ""){
            $("#errEmail").html("Please fill your Email id");
            flagEmail = false;
        }
        else
            flagEmail = true;

        //password
        if($("#txtPassword").val() == ""){
            $("#errPassword").html("Please fill a password");
            flagPassword = false;
        }
        else
            flagPassword = true;

        //mobile number
        if($("#txtMobile").val() == ""){
            $("#errMobile").html("Please fill your mobile number");
            flagMobile = false;
        }
        else 
            flagMobile = true;

        if(flagEmail & flagPassword & flagMobile){
            var index = $("#selectUser").prop('selectedIndex');
            if(index == 0){
                $("#errUser").html("Select your Type");
                return;
            }
            var signupURL = "/signup?email=" +  $("#txtEmail").val() 
                                             + "&password=" + $("#txtPassword").val()
                                             + "&mobile=" + $("#txtMobile").val()
                                             + "&user=" + $("#selectUser").val(); 
            $.get(signupURL,function(response){
                if(response.affectedRows){
                    $("#signupModal").modal('hide');
                    $("#loginModal").modal('show');
                }
                else{
                    $("#resultSignup").css("color", "#219F94");
                    $("#resultSignup").html("User already registered");
                }
            });
        }
        else{
            event.preventDefault();
        }
    });

    //----------------------VALIDATIONS OF LOGIN----------------
    var flagLoginEmail = false,flagLoginPassword = false;

    //1. Email
    $("#txtLoginEmail").blur(function(){
        var email = $(this).val();
        var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email == ""){
            $("#errLoginEmail").html("Please fill your registered Email id");
            flagLoginEmail = false;
        }
        else if(regexEmail.test(email) == false){
            $("#errLoginEmail").html("Please fill valid Email id");
            flagLoginEmail = false;
        }
        else{
            $("#errLoginEmail").html("");
            flagLoginEmail = true;
        }
    });

    //2. Password
    $("#txtLoginPassword").blur(function(){
        var pass = $(this).val();
        if(pass == ""){
            $("#errLoginPassword").html("Please fill your password");
            flagLoginPassword = false;
        }
        else{
            $("#errLoginPassword").html("");
            flagLoginPassword = true;
        }
    });

    //---------------LOGIN AFTER VALIDATIONS---------
    $("#btnLogin").click(function(event){

        //email 
        if($("#txtLoginEmail").val() == ""){
            $("#errLoginEmail").html("Please fill your registered Email id");
            flagLoginEmail = false;
        }
        else
            flagLoginEmail = true;

        //password
        if($("#txtLoginPassword").val() == ""){
            $("#errLoginPassword").html("Please fill your password");
            flagLoginPassword = false;
        }
        else
            flagLoginPassword = true;
        
        if(flagLoginEmail & flagLoginPassword)
        {
            var loginURL = "/login?email=" + $("#txtLoginEmail").val();
            $.get(loginURL,function(response){
                if(response.length == 0){
                    $("#resultLogin").html("First register yourself");
                }
                else if(response[0].password != $("#txtLoginPassword").val()){
                    $("#resultLogin").html("Wrong Password");
                }
                else{
                    $("#resultLogin").html("");
                    if(response[0].type == "citizen")
                    {
                        window.localStorage.setItem("email",$("#txtLoginEmail").val());
                        window.localStorage.setItem("type", "citizen");
                        window.location.href = "../dash-user.html";
                    }
                    else if(response[0].type == "worker"){
                        window.localStorage.setItem("email",$("#txtLoginEmail").val());
                        window.localStorage.setItem("type", "worker");
                        window.location.href = "../dash-worker.html";
                    }
                    else if(response[0].type == "admin"){
                        window.localStorage.setItem("email",$("#txtLoginEmail").val());
                        window.localStorage.setItem("type", "admin");
                        window.location.href = "../admin-dash.html";
                    }
                }
            })
        }
        else{
            event.preventDefault();
        }
    })

})