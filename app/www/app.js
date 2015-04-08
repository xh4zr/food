angular.module('app.foodApi',[]).factory('foodApi', foodApi);

function foodApi($http){
	var factory = {};

	factory.searchText;
	factory.results;
	factory.selected;

	factory.search = function() {
		return $http.get(window.location.origin + '/search?term=' + factory.searchText);
		// console.log(factory.searchText);
		// factory.results = [{
		// 	id: 1,
		// 	name:'Burger',
		// 	description: 'a burger'
		// },{
		// 	id: 2,
		// 	name:'salad',
		// 	description: 'a salad'
		// }];
	}
	
	factory.getDetails = function(id) {
		return $http.get(window.location.origin + '/search?term=' + factory.searchText);
		// if (id = 1) {
		// 	return {
		// 		id: 1,
		// 		name:'Burger',
		// 		description: 'a burger',
		// 		calories: '1000',
		// 		tags:'bacon'
		// 	}
		// }
		// else if (id = 2) {
		// 	return {
		// 		id: 2,
		// 		name:'salad',
		// 		description: 'a salad',
		// 		calories: '10',
		// 		tags:'lettuce'
		// 	}
		// }
		// else return null;
	}

	return factory;
}

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
angular.module('app',[
	'ui.router',
	'app.foodApi',
	'app.search',
	'app.list'
]).config(config);

function config($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/search');
	//$locationProvider.html5Mode(true);

	$stateProvider
		.state('search', {
			url:'/search',
			templateUrl:'src/search/search.html',
			controller:'searchCtrl'
		})
		.state('results', {
			url:'/results',
			views: {
				'':{
					templateUrl:'src/results/results.html'
				},
				'list@results': {
					templateUrl:'src/results/list.html',
					controller:'listCtrl'
				},
				'details@results': {
					templateUrl:'src/results/details.html'
				}
			}
		});
}
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

		var regex = new RegExp(/^[a-zA-Z\-]+$/gmi);
		$scope.isValid = regex.test(foodApi.searchText);
	}

	$scope.searchObj = {
		location:null,
		price:null,
		calories:null
	};

}