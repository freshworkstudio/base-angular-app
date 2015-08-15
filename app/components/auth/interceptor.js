var auth = angular.module('App');

auth.factory('authInterceptor', ['$rootScope', '$q', '$window', function($rootScope, $q, $window) {
	return {
		request: function(config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {
				config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
			}

			return config;
		},

		responseError: function(rejection) {

			if (rejection.status === 401) {
				$rootScope.$emit('get_401');
			}

			$rootScope.$emit('get_http_error', {status: rejection.status, data: rejection.data});

			return $q.reject(rejection);
		}
	};
}]);

auth.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('authInterceptor');
}]);
