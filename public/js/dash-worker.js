if(localStorage.getItem("type") == "worker"){
    $(document).ready(function(){

        $("#user").html(localStorage.getItem("email"));
    
        $("#btnLogout").click(function(){
            localStorage.clear();
            location.href = "../index.html";
        })
    })
}
else{
    location.href = "../index.html";
}