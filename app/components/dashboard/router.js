var Routes = angular.module('routes');

Routes.config(['$stateProvider', '$urlRouterProvider', '$breadcrumbProvider', function($stateProvider,  $urlRouterProvider, $breadcrumbProvider) {

	$stateProvider
	.state('app.dashboard', {
		url: '/dashboard',
		data: {
			requireLogin: true
		},
		templateUrl: 'components/dashboard/dashboard.html',
		controller: 'DashboardController',
		ncyBreadcrumb: {
			label: 'Dashboard'
		}
	});

}]);
