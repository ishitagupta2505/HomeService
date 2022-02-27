if(localStorage.getItem("type") == "citizen"){
    $(document).ready(function(){
        document.getElementById("txtEmail").value = localStorage.getItem("email");
        document.getElementById("txtEmailSetting").value = localStorage.getItem("email");
    
        //------------AUTO FETCH DATA ON PAGE LOAD--------------------
        var urlFetch = "/fetchRecord?email=" + $("#txtEmail").val();
        $.get(urlFetch,function(response){
            console.log(response[0]);
            $("#txtName").val(response[0].name);
            $("#txtContact").val(response[0].contact);
            $("#txtAddress").val(response[0].address);
            $("#txtCity").val(response[0].city);
            $("#txtState").val(response[0].state);
            $("#imgPic").attr("src","uploads/" + response[0].profilename);
            $("#hiddenPic").val(response[0].profilename);
        })
    
    
        // ---------------VALIDATIONS PROFILE--------------
        var  flagName = false,  flagContact = false, flagAddress = false;
    
        //1. Name
        $("#txtName").blur(function(){
            if($(this).val() == ""){
                $("#errName").html("Fill your name");
                flagName = false;
            }
            else{
                $("#errName").html("");
                flagName = true;
            }
        })
    
        //2. Contact
        $("#txtContact").blur(function(){
            var mobile = $(this).val();
            var regexMobile = /^[6-9]{1}[0-9]{9}$/;
            if(mobile == ""){
                $("#errContact").html("Please fill your mobile number");
                flagContact = false;
            }
            else if(regexMobile.test(mobile) == false){
                $("#errContact").html("Please fill valid mobile number");
                flagContact = false;
            }
            else{
                $("#errContact").html("");
                flagContact = true;
            }
        });
    
        //3. Address
        $("#txtAddress").blur(function(){
            if($(this).val() == ""){
                $("#errAddress").html("Fill your address");
                flagAddress = false;
            }
            else{
                $("#errAddress").html("");
                flagAddress = true;
            }
        })
    
        // City
        $("#txtCity").change(function(){
            $("#errCity").html("");
        })
    
        // State
        $("#txtState").change(function(){
            $("#errState").html("");
        })
    
        //-------------UPDATE AFTER VALIDATION---------------
        $("#btnUpdate").click(function(event){
            document.getElementById("frm").action = "/updateRecord";
    
            //check name field
            if($("#txtName").val() == ""){
                $("#errName").html("Fill your name");
                flagName = false;
            }
            else{
                $("#errName").html("");
                flagName = true;
            }
    
            //check mobile number
            if($("#txtContact").val() == ""){
                $("#errContact").html("Please fill your mobile number");
                flagContact = false;
            }
            else{
                flagContact = true;
            }
    
            //check address
            if($("#txtAddress").val() == ""){
                $("#errAddress").html("Fill your address");
                flagAddress = false;
            }
            else{
                $("#errAddress").html("");
                flagAddress = true;
            }
    
            //if valid then update
            if(flagName & flagContact & flagAddress){
                if($("#txtCity").prop('selectedIndex') == 0){
                    $("#errCity").html("Please select your city");
                    return;
                }
                if($("#txtState").prop('selectedIndex') == 0){
                    $("#errState").html("Please select your state");
                    return;
                }
                document.frm.submit();
                alert("Profile updated");
            }
            else{
                event.preventDefault();
            }
        })
    
        //-----------------setting modal
        var flagPass = false, flagNew = false;
        $("#txtPassword").blur(function(){
            var pass = $(this).val();
            if(pass == ""){
                $("#errPassword").html("Enter your existing password");
                flagPass = false;
            }
            else{
                $("#errPassword").html("");
                flagPass = true;
            }
        })
    
        $("#txtNewPassword").blur(function(){
            var pass = $(this).val();
            var regexPass = /^[A-Za-z]\w{7,14}$/;
            if(pass == ""){
                $("#errNewPassword").html("Enter password");
                flagNew = false;
            }
            else if(regexPass.test(pass) == false){
                $("#errNewPassword").html("password must be between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter");
                flagNew = false;
            }
            else{
                $("#errNewPassword").html("");
                flagNew = true;
            }
        })
    
        //--------AJAX change password
        $("#btnChange").click(function(event){
            if(flagPass & flagNew){
                var url = "/changePassword?email=" + $("#txtEmailSetting").val() + "&password=" + $("#txtPassword").val() + "&newPassword=" + $("#txtNewPassword").val();
                $.get(url,function(response){
                    console.log(response);
                    if(response.affectedRows){
                        $("#result").css("color", "#219F94");
                        $("#result").html("Password Updated");
                    }
                    else{
                        $("#result").css("color", "rgb(240, 100, 100)");
                        $("#result").html(response);
                    }
                })
            }
            else{
                $("#result").css("color", "rgb(240, 100, 100)");
                $("#result").html("fill details");
                event.preventDefault();
            }
        })
    
    })
    
    // image preview
    function showPic(ptr,ptrImage){
        ptrImage.src = URL.createObjectURL(ptr.files[0]);
    }
}
else{
    location.href = "../index.html";
}