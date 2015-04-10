angular.module('app.details',[]).controller('detailsCtrl', function($scope, foodApi) {
    $scope.api = foodApi;

});