var API = angular.module('API', []);

API.factory('MyStyleApi', ['restmod', 'inflector', '$rootScope', 'APIHandler', function(restmod, inflector, $rootScope, APIHandler) {
	$rootScope.$on('get_http_error', function(e, data) {
		if (data.status == 422) {
			APIHandler.failResponse(data.status, data.data);
		}
	});

	return restmod.mixin('DefaultPacker', { // include default packer extension
		$config: {
			style: 'MyLaravelStyle',
			primaryKey: 'id',
			jsonMeta: 'meta',
			jsonRoot: 'data',
			urlPrefix: CONFIG.API_V1_BASE
		},

		$extend: {
			// special snakecase to camelcase renaming
			Model: {
				//decodeName: inflector.camelize,
				//encodeName: function(_v) { return inflector.parameterize(_v, '_'); },
				//encodeUrlName: inflector.parameterize
			}
		}
	});

}]);

API.config(['restmodProvider', function(restmodProvider) {
	restmodProvider.rebase('MyStyleApi');

}]);

API.factory('API', ['$http', 'APIHandler', function($http, APIHandler) {
	return {
		request: function(method, endpoint, data) {
			data = data || {};

			var baseUrl = CONFIG.API_V1_BASE;

			return $http({
				method:method,
				url:baseUrl + endpoint,
				data:data
			}).error(function(data, status) {
				if (status == 403) {
					swal('Acceso denegado', 'Al parecer no tienes permiso para revisar esta sección o realizar esta accion', 'error');
				} else if (status == 404) {
					swal('Método no encontrado', 'Al parecer la aplicación está intentando realizar una acción que la API no tiene disponible. Avise al administrador del sistema', 'error');
				} else {
					APIHandler.failResponse(status, data);
				}
			});

		}
	};
}]);

API.factory('APIHandler', [function() {
	function getMessageError(data) {

		var errorStr = '';
		if (typeof data == 'object') {
			for (var i in data) {
				for (var h in data[i]) {
					errorStr += '<li>' + data[i][h] + '</li>';
				}
			}
		} else {
			errorStr = ('An unexpected error ocurred. Please try again later.');
		}

		return errorStr;
	}

	return {
		failResponse: function(status, data) {
			var errorStr = 'Unknown error. Please try again later. ';

			if (status == 422)
			{
				errorStr = '<div class="errors"><ul>' + getMessageError(data) + '</ul></div>';
			}

			if (status == 403) {
				errorStr = 'You don\'t have permission to execute this task';
			}
			if (status == 404) {
				errorStr = 'The request page doesn\'t exists. ';
			}

			swal({
				title:	'Error',
				text:	errorStr,
				type:	'error',
				html:	true
			});

		}
	};
}]);
