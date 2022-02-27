if(localStorage.getItem("type") == "worker"){
    $(document).ready(function(){
    
        $("#txtEmail").val(localStorage.getItem("email"));
        document.getElementById("txtEmailSetting").value = localStorage.getItem("email");
    
        //------------AUTO FETCH DATA ON PAGE LOAD--------------------
        var urlFetch = "/fetchRecordWorker?email=" + $("#txtEmail").val();
        $.get(urlFetch,function(response){
            console.log(response);
                $("#txtName").val(response[0].name);
                $("#txtContact").val(response[0].contact);
                $("#txtAddress").val(response[0].address);
                $("#txtCity").val(response[0].city);
                $("#txtState").val(response[0].state);
                $("#txtCategory").val(response[0].category);
                $("#txtExperience").val(response[0].experience);
                $("#txtWork").val(response[0].workdone);
                $("#imgPic").attr("src","uploads/" + response[0].profilepic);
                $("#imgProof").attr("src","uploads/" + response[0].proofpic);
                $("#hiddenPic").val(response[0].profilepic);
                $("#hiddenProof").val(response[0].proofpic);
        })
    
        //---------------VALIDATIONS PROFILE--------------
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
    
        //4. City
        $("#txtCity").change(function(){
            $("#errCity").html("");
        })
    
        //5. State
        $("#txtState").change(function(){
            $("#errState").html("");
        })
    
        //6. category
        $("#txtCategory").change(function(){
            $("#errCategory").html("");
        })
    
        //7. experience
        $("#txtExperience").change(function(){
            $("#errExperience").html("");
        })
    
        //--------------update button
        $("#btnUpdate").click(function(event){
        
            document.getElementById("frm").action = "/updateRecordWorker";
    
            //name
            if($("#txtName").val() == ""){
                $("#errName").html("Fill your name");
                flagName = false;
            }
            else{
                flagName = true;
            }
    
            //contact
            if($("#txtContact").val() == ""){
                $("#errContact").html("Please fill your mobile number");
                flagContact = false;
            }
            else{
                flagContact = true;
            }
    
            //address
            if($("#txtAddress").val() == ""){
                $("#errAddress").html("Fill your address");
                flagAddress = false;
            }
            else{
                flagAddress = true;
            }
    
            if(flagName & flagAddress & flagContact){
                if($("#txtCity").prop('selectedIndex') == -1){
                    $("#errCity").html("Select your city");
                    return;
                }
                if($("#txtState").prop('selectedIndex') == -1){
                    $("#errState").html("Select your State");
                    return;
                }
                if($("#txtCategory").prop('selectedIndex') == -1){
                    $("#errCategory").html("Select your category");
                    return;
                }
                if($("#txtExperience").prop('selectedIndex') == -1){
                    $("#errExperience").html("Select your experience");
                    return;
                }
                document.frm.submit();
                alert("Profile Updated");
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