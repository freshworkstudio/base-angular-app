var auth = angular.module('App');

auth.factory('User', ['API', function(API) {
	return {
		me: function() {
			return API.request('GET', 'me');
		}
	};
}]);
