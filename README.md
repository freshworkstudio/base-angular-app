# Base Angular Application
#### Single plage application made easy
This repo let you create an awesome angular app from scratch, giving you a simple and elegant boilerplate for your new project.

## Compilation
We use [Gulp](http://gulpjs.com/) and [laravel-elixir](http://laravel.com/docs/5.1/elixir) for task automation.

Gulp process:

 - Cache HTML templates from the `app/` directory
 - Compile LESS files
 - Merge (and minify in production) css files into `public/css/all.css`
 - Merge (and minify in production) js files into `public/js/all.css`
 - Copy files (as `vendor/bower_components/font-awesome/fonts`) to `public` folder.

You can customize this file as needed to add your custom tasks. Just [read laravel-elixir docs](http://laravel.com/docs/5.1/elixir).

## Getting started
Clone the repo:
```bash
cd /path/to/your/projects/
git clone https://github.com/freshworkstudio/base-angular-app.git my_awesome_project
cd my_awesome_project
```
Run the compilation process with gulp.

*If you haven't already done so*, you have to install npm ([install node.js](https://nodejs.org/)) and then install gulp and bower globally
```bash
npm install -g gulp
npm install -g bower
```

Install npm dependencies
```bash
npm install
```
Install bower dependencies
```bash
bower install
```
That's all. Then, when you start editing your project code, you just have to run `gulp watch` before you start coding. This will watch your filesystem waiting for changes and automatically compile your files when you saves them.
```bash
gulp
gulp watch
```


## The file structure

```
\app
	\modules
		\home
			home.js
			router.js
			home.html
		\auth
			router.js
			auth.js
			login.html
			register.html
		\anything_you_want
		base_controller.js
	\templates
	app.js
	routes.js
\resources
	\assets
		\css
		\less
			app.less
		\img
	\compiled
\public
	\js
	\css
	index.html
.jscsrc
.bowerrc
.gitignore
config.js
package.json
gulpfile.js
bower.json
```
#### app
The `\app` directory is where you put your application code, including .js and html templates. You can check the default code that comes with the project as an example.

As you can see, `\app\modules` contains the pieces of your application, grouped in folders to organize your code. Btw, you can organize everything in the `\app` directory as you want.

In the gulp process, every `.js` file in this folder is gruped and merged in a final `public/js/all.js`, and every `.html` file is merged and cached in a [templateCache](https://docs.angularjs.org/api/ng/service/$templateCache) angular service.

#### less

Edit your `\resources\assets\less\app.less` to manage your stylesheets.
BTW, you can use [SASS](http://sass-lang.com/), just changing the gulpfile taks.

#### css
Add aditional css files in `resources\assets\css`directory if you want.

#### img
The `\resources\assets\img` directory is minded to put your project images and then add a gulp task to minify your images and copy them to public/img, but this is not already done by default in this project. Maybe later.

#### \public
Tis is the main directory. All your compiled file finally get there. If you are running this in a eb server, you just have to set the pubic directory as this folder, so no one can access tour source files, just the compiled ones.

## Bower dependencies
This base project come with some useful libraries, but obviously you can use whatever you want. Just edit `bower.json`

## Coding Style
We use [JSCS](http://jscs.info/) (Javascript Coding Style) to force us to code using a consistent style between .js files.
By default, we use [Airbnb coding style.](https://github.com/airbnb/javascript), but you can change this, in `.jscsrc` file.

JSCS in your editor:

 - [Atom.io jscs linter package](https://atom.io/packages/linter-jscs)
 - [Sublime jscs linter package](https://packagecontrol.io/packages/SublimeLinter-jscs)

###JSCS rule exceptions
There are some exceptions to the Airbnb coding style that we added, some of them is the multipleVarDeclaration.
**disallowMultipleVarDec**:  we use [this approach](http://benalman.com/news/2012/05/multiple-var-statements-javascript/).
