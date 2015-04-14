angular.module('app.foodApi',[]).factory('foodApi', foodApi);

function foodApi($http){
	var factory = {};

	factory.searchText;
	factory.results;
	factory.selected;

	factory.search = function() {
		$http.get('/search?term=' + factory.searchText).success(function(data){
			factory.results = data;
		});
	}
	
	factory.getDetails = function(id) {
		$http.get('/details?id=' + factory.selected.id).success(function(data){
			factory.selected = factory.results[0];
		});
	}

	return factory;
}