var auth = angular.module('App');

auth.controller('AuthController', ['$scope', '$rootScope', '$state', 'testAuthService',  function($scope, $rootScope, $state, authService) {
	$rootScope.page.bodyClass = 'login-page';

	$scope.submitting = false;
	$scope.login = function() {
		var credentials = $scope.auth;

		if ($scope.submitting) return;

		$scope.submitting = true;

		authService.login(credentials,
			function() {
				$state.go('app.dashboard');
			},

			function() {
				$scope.submitting = false;
			}

		);

	};
}]);
