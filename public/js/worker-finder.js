if(localStorage.getItem("type") == "citizen"){
    var myModule = angular.module("ModuleCreated", []);
    var myController = myModule.controller("ControllerCreated", function($scope,$http){

        $scope.selCity;
        $scope.cityJson;
        $scope.showAllCities = function(){
            var url = "/fetchCityWorker";
            $http.get(url).then(noError,ifError);
            function noError(response){
                $scope.cityJson = response.data;
                $scope.selCity = $scope.cityJson[0].city;
            }
            function ifError(){
                alert(response.data);
                return;
            }
        }

        $scope.selCategory;
        $scope.categoryJson;
        $scope.showAllCategories = function(){
            var url = "/fetchCategoryWorker";
            $http.get(url).then(noError,ifError);
            function noError(response){
                $scope.categoryJson = response.data;
                $scope.selCategory = $scope.categoryJson[0].category;
            }
            function ifError(){
                alert(response.data);
            }
        }

        $scope.noRecord;
        $scope.records;
        $scope.showRecord = function(){
            var url = "fetchCityCategoryRecord?city=" + $scope.selCity + "&category=" + $scope.selCategory;
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
            function ifError(){
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