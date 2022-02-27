if(localStorage.getItem("type") == "citizen"){
    var myModule = angular.module("MyModuleCreated", []);
    var myController = myModule.controller("MyControllerCreated",function($scope,$http){

        $scope.records;
        $scope.fetchRequirements = function(){
            var url = "/fetchRequirements?email=" + localStorage.getItem("email");
            $http.get(url).then(noError,ifError);
            function noError(response){
                console.log(response.data);
                $scope.records = response.data;
            }
            function ifError(response){
                alert(response.data);
            }
        }
    })
}
else{
    location.href = "../index.html";
}