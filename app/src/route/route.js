angular.module('app',[
	'ui.router',
	'app.foodApi',
	'app.search',
	'app.list',
	'app.details'
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
					templateUrl:'src/results/details.html',
					controller:'detailsCtrl'
				}
			}
		});
}