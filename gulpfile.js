var elixir = require('laravel-elixir');
require('laravel-elixir-ngtemplatecache');

elixir.extend('angular-order', function() {

});

var paths = {
	base:		'./',
	compiled:	'resources/compiled/',
	bower:		'vendor/bower_components/',
	assets:		'resources/assets/',
	js:			'resources/assets/js/',
	css:		'resources/assets/css/',
	less:		'resources/assets/less/',
	publicDir:	'public/',
	publicCSS:	'public/css/',
	publicJS:	'public/js/'
};

elixir(function(mix) {

	//cache html templates
	mix.ngTemplateCache(null, paths.compiled, './app/', {
		htmlmin: {
			collapseWhitespace: false,
			removeComments: true
		}
	});

	//compile less files
	mix.less('app.less', paths.compiled);

	//merge css
	mix.styles([
		paths.bower + 'bootstrap/dist/css/bootstrap.css',
		paths.bower + 'font-awesome/css/font-awesome.css',
		paths.bower + 'sweetalert/dist/sweetalert.css',
		paths.css + '**',
		paths.compiled	+ '*.css'

	], 'public/css', './');

	//merge scripts
	mix.scripts([

		'config.js',
		paths.bower + 'jquery/dist/jquery.js',
		paths.bower + 'underscore/underscore.js',
		paths.bower + 'angular/angular.js',
		paths.bower + 'sweetalert/dist/sweetalert-dev.js',
		paths.bower + 'angular-ui-router/release/angular-ui-router.js',
		paths.bower + 'angular-sanitize/angular-sanitize.js',
		paths.bower + 'angular-breadcrumb/dist/angular-breadcrumb.js',
		paths.bower + 'bootstrap/dist/js/bootstrap.js',
		paths.bower + 'fastclick/lib/fastclick.js',
		paths.bower + 'angular-restmod/dist/angular-restmod-bundle.js',
		paths.bower + 'moment/moment.js',
		paths.compiled + '*.js',
		paths.base	+ 'app/*.js',
		paths.base	+ 'app/app.js',
		paths.base	+ 'app/**/**.js'

	], 'public/js', './');

	//copy files to public dir
	mix.copy(paths.bower +  'font-awesome/fonts', paths.publicDir + 'fonts/');
	mix.copy(paths.bower +  'bootstrap/fonts', paths.publicDir + 'fonts/');
});
