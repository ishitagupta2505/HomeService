if(localStorage.getItem("type") == "citizen"){
    $(document).ready(function(){

        checkUser();
        function checkUser()
        {
            if(localStorage.getItem("email")==null)
            location.href="../index.html";
        }
    
        document.getElementById("user").innerHTML = localStorage.getItem("email");
    
    
        $("#btnLogout").click(function(){
            localStorage.clear();
            location.href="../index.html";
        });
    })
}
else{
    location.href = "../index.html";
}