var auth = angular.module('App');

function AuthService(API, $window, $rootScope, User) {
	var _this = this;
	this.currentUser = null;

	this.login = function(credentials, onSuccess, onError) {
		return API.request('POST', 'auth/login', credentials)
			.error(function(data, status) {
				delete $window.sessionStorage.token;
				_this.currentUser = null;
				if (typeof onError == 'function') onError(data, status);

				if (status == 401 || (data && data.error == 'invalid_credentials')) {
					swal('Credenciales inválidas', 'El email y contraseña ingresados no coinciden', 'error');
				}

			})
			.success(function(data, success) {
				$window.sessionStorage.token = data.token;
				_this.setCurrentUser(data.user);

				if (typeof onSuccess == 'function') {
					_this.getCurrentUser(function(user) {
						onSuccess(user, status);
					});
				}

			});

	};

	this.logout = function() {
		delete $window.sessionStorage.token;
		_this.currentUser = null;
	};

	this.setCurrentUser = function(data) {
		data.created_at = new Date(data.created_at.replace(/-/g, '/'));

		localStorage.setObject('currentUser', data);
		_this.currentUser = data;
	};

	this.getCurrentUser = function(cb) {
		if (this.currentUser) return cb(this.currentUser);

		_this.currentUser = localStorage.getObject('currentUser');
		if (this.currentUser) return cb(this.currentUser);

		User.me()
			.success(function(data, status) {
				_this.setCurrentUser(data);

				cb(_this.getCurrentUser);
			})
			.error(function() {
				cb(null);
			});
	};
}

function TestAuthService($window, $rootScope) {
	var _this = this;
	this.currentUser = null;
	this.login = function(credentials, onSuccess, onError) {
		var user = {
			name: credentials.email,
			email: credentials.email
		};
		_this.setCurrentUser(user);
		$window.sessionStorage.token = 'faketoken';
		
		//Always success
		onSuccess(user, 200);
	};

	this.logout = function() {
		_this.currentUser = null;
	};

	this.setCurrentUser = function(data) {
		data.created_at = new Date();

		localStorage.setObject('currentUser', data);
		_this.currentUser = data;
	};

	this.getCurrentUser = function(cb) {
		if (this.currentUser) return cb(this.currentUser);

		_this.currentUser = localStorage.getObject('currentUser');
		if (this.currentUser) return cb(this.currentUser);

		cb(null);
	};
}

auth.service('authService', ['API', '$window', '$rootScope', 'User', AuthService]);
auth.service('testAuthService', ['$window', '$rootScope', TestAuthService]);
