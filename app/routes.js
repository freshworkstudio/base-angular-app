var routes = angular.module('routes', ['ncy-angular-breadcrumb', 'ui.router']);

routes.config(['$stateProvider', '$urlRouterProvider', '$breadcrumbProvider', '$locationProvider', function($stateProvider,  $urlRouterProvider, $breadcrumbProvider, $locationProvider) {

	$breadcrumbProvider.setOptions({
		prefixStateName: 'app.home'
	});

	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			abstract: true,
			templateUrl: 'templates/default.html',
			controller: 'BaseController',
			data: {
				requireLogin: true
			}
		})
		.state('app.home', {
			url: '/',
			templateUrl: 'modules/home/home.html',
			controller: 'HomeController',
			ncyBreadcrumb: {
				label: 'Inicio'
			}
		});

}]);
