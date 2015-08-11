var elixir = require('laravel-elixir');
require('laravel-elixir-imagemin');
require('laravel-elixir-ngtemplatecache');

var paths = {
	base:		'./',
	compiled:	'resources/compiled',
	bower:		'bower_components/',
	assets:		'resources/assets/',
	js:			'resources/assets/js/',
	css:		'resources/assets/css/',
	less:		'resources/assets/less/',
	publicDir:	'public/',
	publicCSS:	'public/css/',
	publicJS:	'public/js/'
};

elixir(function(mix) {
	mix.imagemin();
	mix.ngTemplateCache(null, './resources/assets/js', './public/', {
		htmlmin: {
			collapseWhitespace: true,
			removeComments: true
		}
	});

	mix.less('app.less', paths.compiled);

	mix.styles([
		paths.bower + 'bootstrap/dist/css/bootstrap.css',
		paths.bower + 'font-awesome/css/font-awesome.css',
		paths.compiled	+ 'app.css'

	], 'public/css', './');

	mix.scripts([

		'config.js',
		paths.bower + 'jquery/dist/jquery.js',
		paths.bower + 'lodash/lodash.js',
		paths.bower + 'angular/angular.js',
		paths.bower + 'angular-ui-router/release/angular-ui-router.js',
		paths.bower + 'angular-sanitize/angular-sanitize.js',
		paths.bower + 'bootstrap/dist/js/bootstrap.js',
		paths.bower + 'fastclick/lib/fastclick.js',
		paths.bower + 'angular-restmod/dist/angular-restmod-bundle.js',
		paths.bower + 'moment/moment.js',
		paths.js	+ '*/**.js',
		paths.js	+ '*.js'

	], 'public/js', './');

	mix.copy(paths.bower +  'font-awesome/fonts/', paths.publicDir + 'fonts/');
	mix.copy(paths.bower +  'bootstrap/fonts/', paths.publicDir + 'fonts/');
	mix.copy(paths.bower +	'iCheck/skins/square/blue.png', paths.publicDir + 'css/');
	mix.copy(paths.bower +	'iCheck/skins/square/blue@2x.png', paths.publicDir + 'css/');
});
