if(localStorage.getItem("type") == "citizen"){
    $(document).ready(function(){

        $("#txtEmail").val(localStorage.getItem("email"));
    
        var flagMobile = false;
        $("#txtContact").blur(function(){
            var mobile = $(this).val();
            var regexMobile = /^[6-9]{1}[0-9]{9}$/;
            if(mobile == ""){
                $("#errContact").html("Please fill your mobile number");
                flagMobile = false;
            }
            else if(regexMobile.test(mobile) == false){
                $("#errContact").html("Please fill valid mobile number");
                flagMobile = false;
            }
            else{
                $("#errContact").html("");
                flagMobile = true;
            }
        });
    
        $("#category").blur(function(){
            var type = $(this).val();
            if(type != "")
                $("#errType").html("");
        })
    
        $("#txtCity").blur(function(){
            if($("#txtCity").val() != "")
                $("#errCity").html("");
        })
    
        //--------------------SUBMIT AFTER VALIDATION---------------
        $("#btnPost").click(function(event){
            document.getElementById("frm").action = "/post";
            
            if($("#txtContact").val() == ""){
                $("#errContact").html("Please fill your mobile number");
                flagMobile = false;
            }
            else
                flagMobile = true;
    
            if(flagMobile){
                if($("#category").val() == ""){
                    $("#errType").html("Select type");
                    event.preventDefault();
                    return;
                }
                if($("#txtCity").val() == ""){
                    $("#errCity").html("Select your city");
                    event.preventDefault();
                    return;
                }
                document.frm.submit();
            }
            else
                event.preventDefault();
        })
    })
}
else{
    location.href = "../index.html";
}