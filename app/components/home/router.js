var routes = angular.module('routes');

routes.config(['$stateProvider', function($stateProvider) {

	$stateProvider
		.state('app.home', {
			url: '/',
			templateUrl: 'components/home/home.html',
			controller: 'HomeController',
			ncyBreadcrumb: {
				label: 'Home'
			}
		});

}]);
