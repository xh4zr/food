angular.module('app.list',[]).controller('listCtrl', function($scope, foodApi) {
    window.d = $scope;
    $scope.api = foodApi;

    $scope.isSelected = function(index) {
        if ($scope.api.selected == $scope.api.results[index]) {
            return true;
        }
        else return false;
    }
});