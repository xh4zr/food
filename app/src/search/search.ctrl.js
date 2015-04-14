angular.module('app.search',[]).controller('searchCtrl', searchCtrl);

function searchCtrl($scope, foodApi) {
	window.debug = $scope;
	$scope.showAdv;
	$scope.api = foodApi;

	console.log(foodApi);

	$scope.handleClick = function() {
		if (!$scope.isValid) {
			console.log("Not Valid");
			return;
		}

		if ($scope.showAdv) {
			//Send search obj
			//foodApi.search();
			console.log($scope.searchObj);
			//foodApi.searchText = $scope.searchObj;
		} else {
			foodApi.search();
		}
	}

	$scope.isValid = true;
	$scope.validate = function() {
		if (!foodApi.searchText)
			return;

		var regex = new RegExp(/^[a-zA-Z\-\s]+$/gmi);
		$scope.isValid = regex.test(foodApi.searchText);
	}
//	console.log(foodApi.searchText)

	$scope.searchObj = {
//		search:null,
		location:null,
		price:null,
		calories:null
	};

}
