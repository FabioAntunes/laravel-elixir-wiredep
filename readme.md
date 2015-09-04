#Laravel-Elixir-Wiredep
>This is a simple wrapper around Laravel Elixir for Wiredep. 

## Getting Started
Install the module with [npm](https://npmjs.org):

**laravel-elixir >v3.x**
```bash
$ npm install --save-dev laravel-elixir-wiredep
```

**laravel-elixir < v2.x**
```bash
$ npm install --save-dev laravel-elixir-wiredep@2.x-release
```


And add it to your Elixir-enhanced Gulpfile, like so:

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-wiredep');

elixir(function(mix) {
   mix.wiredep();
});
```

Then you just have to edit your php file(s) and some extra markup, like this:

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	
	<!-- bower:css -->
	<!-- endbower -->
</head>
<body>
	<!-- bower:js -->
	<!-- endbower -->
</body>
</html>
```

This will scan your Bower dependencies on `bower.json` and inject them in all your `.php` files inside `resources/views/` directory. Instead, if you only want to inject dependencies on a single file, you may do:

```javascript
mix.wiredep({src: 'master.blade.php'})
```

If you run gulp watch this will also watch your `bower.json` for any changes and inject them automatically.
Whenever you install a new bower package with the `-S` command your php files will be updated.



## NOTE
Since Wiredep serves bower components, these must inside the public folder.
Just create a `.bowerrc` file in the root of your project folder and specify the destination folder inside the public folder, like so:
```javascript
{
  "directory" : "public/bower_components"
}
```

## Options
This wrapper accepts two objects with configurations, the first one is for the wrapper itself and second one is for the Wiredep package you can get more info [here](https://github.com/taptapship/wiredep#configuration)

These are the default wrapper options:
```javascript
{
	baseDir: 'resources/views/',	//the folder for your views
	src: false,	//if you just want to inject dependencies on one file just specify it's source, relative to baseDir
	searchLevel: '**/*.php'	//How many search levels you want

}
```

## Example
This is an example of a Gulp file that Wiredeps **only** your javascript dependencies and compiles your custom Sass file into the `resources/views/master.blade.php`:
```javascript
var elixir = require('laravel-elixir');
require('laravel-elixir-wiredep');

var paths = {
    'bootstrap': './public/bower_components/bootstrap-sass-official/assets/'
}

elixir(function(mix) {
    mix.sass('main.scss', 'public/css/', {includePaths: [paths.bootstrap + 'stylesheets/']})
        .wiredep({src: 'master.blade.php'});
});
```