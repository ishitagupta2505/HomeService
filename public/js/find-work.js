if(localStorage.getItem("type") == "worker"){
    var myModule = angular.module("MyModuleCreated", []);
    var myController = myModule.controller("MyControllerCreated",function($scope,$http){

        $scope.selCity;
        $scope.cities;
        $scope.showAllCities = function(){
            var url = "/fetchCityRequirements";
            $http.get(url).then(noError,ifError);
            function noError(response){
                $scope.cities = response.data;
                $scope.selCity = $scope.cities[0];
            }
            function ifError(response){
                alert(response.data);
            }
        }

        $scope.selCategory;
        $scope.categories;
        $scope.showAllCategories = function(){
            var url = "/fetchCategoryRequirements";
            $http.get(url).then(noError,ifError);
            function noError(response){
                $scope.categories = response.data;
                $scope.selCategory = $scope.categories[0];
            }
            function ifError(response){
                alert(response.data);
            }
        }

        $scope.noRecord;
        $scope.records;
        $scope.showRecord = function(){
            var url = "/fetchRecordRequests?city=" + $scope.selCity + "&category=" + $scope.selCategory;
            $http.get(url).then(noError,ifError);
            function noError(response){
                console.log(response.data);
                if(response.data.length == 0){
                    $scope.noRecord = "Sorry no record available";
                    $scope.records = null;
                    return;
                }
                $scope.records = response.data;
                $scope.noRecord = "";
            }
            function ifError(response){
                alert(response.data);
            }
        }

        $scope.object;
        $scope.showFullRecord = function(index){
            $scope.object = $scope.records[index];
        }
    })
}
else{
    location.href = "../index.html";
}