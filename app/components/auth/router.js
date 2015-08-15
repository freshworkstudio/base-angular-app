var Routes = angular.module('routes');

Routes.config(['$stateProvider', function($stateProvider) {

	$stateProvider
	.state('auth', {
		abstract: true,
		url:'/auth',
		data: {
			requireLogin: false
		},
		templateUrl: 'templates/default.html'
	}).
	state('auth.login', {
		url:'/login',
		templateUrl: 'components/auth/login.html',
		ncyBreadcrumb: {
			label: 'Sign in'
		},
		controller: 'AuthController'
	});

}]);
