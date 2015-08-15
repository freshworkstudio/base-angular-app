var app = angular.module('App', [
	'templates',
	'ui.router',
	'ngSanitize',
	'restmod',
	'API',
	'routes',
	'ncy-angular-breadcrumb',
]);

app.run(['$rootScope', function($rootScope) {
	$rootScope.page = {
		title: 'My awesome website',
		bodyClass: 'class'
	};
}]);
