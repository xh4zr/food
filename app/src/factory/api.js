angular.module('app.foodApi',[]).factory('foodApi', foodApi);

function foodApi($http){
	var factory = {};

	factory.searchText;
	factory.results;
	factory.selected;

	factory.search = function() {
		console.log(factory.searchText);
		$http.get('/search?term=' + factory.searchText).success(function(data){

			console.log(data);
			factory.results = data;
			factory.selected = factory.results[0]; //start off with the first part selected
		});
	}
	
	factory.getDetails = function(id) {
		$http.get('/details?id=' + factory.selected.id).success(function(data){
			angular.copy(data, factory.selected);
		});
	}

	return factory;
}