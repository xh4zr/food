angular.module('app.list',[]).controller('listCtrl', function($scope, foodApi) {
    window.d = $scope;
    $scope.api = foodApi;

    $scope.handleClick = function(index) {
    	$scope.api.selected = $scope.api.results[index];
    	$scope.api.getDetails($scope.api.results[index].id);
    }
});