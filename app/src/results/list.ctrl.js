angular.module('app.list',[]).controller('listCtrl', function($scope, foodApi) {
    window.d = $scope;
    $scope.results = foodApi.results;
    $scope.selectedFood = null;
    $scope.setSelectedFood = function(food){
        $scope.selectedFood = food;
    }
        //function that displays things on click
    $scope.isSelectedFood = function(food){
        return $scope.selectedFood !== null && food.name === $scope.selectedFood.name;
    }

});