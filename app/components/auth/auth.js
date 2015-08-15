var auth = angular.module('App');

auth.run(['$rootScope', '$state', '$window', 'authService', function($rootScope, $state, $window, authService) {
	$rootScope.$on('get_401', function() {
		if ($state.current.name == 'auth.login') return;

		swal({
			title: 'Error',
			text: 'We cant get the needed data to render this page. Please login again.',
			type: 'error',
			confirmButtonText: 'Sign in again'
		},

		function(isConfirm) {
			if (isConfirm) {
				authService.logout();
				$state.go('auth.login');
			}
		});
	});

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
		$rootScope.page.bodyClass = '';

		var requireLogin = (toState.data) ? toState.data.requireLogin : false;

		if (requireLogin && typeof $window.sessionStorage.token === 'undefined') {
			event.preventDefault();

			$state.go('auth.login');
		}
	});
}]);
