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