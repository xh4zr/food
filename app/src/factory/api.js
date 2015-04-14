angular.module('app.foodApi',[]).factory('foodApi', foodApi);

function foodApi($http){
	var factory = {};

	factory.searchText;
	factory.results;
	factory.selected;
	factory.details;

	factory.search = function() {
		$http.get('/search?term=' + factory.searchText).success(function(data){
			factory.results = data;
		});
	}
	
	factory.getDetails = function(id) {
		$http.get('/details?id=' + factory.selected.id).success(function(data){
			factory.details = data[0];
		});
	}

	return factory;
}