var app = angular.module('App');

app.controller('DashboardController', ['testAuthService', '$state', '$scope', function(authService, $state, $scope) {
	$scope.logout = function() {
		authService.logout();
		$state.go('auth.login');
	};
}]);
