#Laravel-Elixir-Wiredep
>This is a simple wrapper around Laravel Elixir for Wiredep.

[![npm](https://img.shields.io/npm/v/laravel-elixir-wiredep.svg)](https://www.npmjs.com/package/laravel-elixir-wiredep)
[![npm](https://img.shields.io/npm/dt/laravel-elixir-wiredep.svg)](https://www.npmjs.com/package/laravel-elixir-wiredep)

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

This will scan your Bower dependencies on `bower.json` and inject them all in your `.php` files inside `resources/views/` directory. Instead, if you only want to inject dependencies on a single file, you may do:

```javascript
mix.wiredep({src: 'master.blade.php'})
```

If you run `$ gulp watch` this will also watch your `bower.json` for any changes and inject them automatically.
Whenever you install a new bower package with the `-S` flag your php files will be updated.



## NOTE
Since Wiredep serves bower components, these must inside the public folder.
Just create a `.bowerrc` file in the root of your project folder and specify the destination folder inside the public folder, like so:
```javascript
{
  "directory" : "public/bower_components"
}
```

## Options
This wrapper accepts three optional parameters with configurations:
```javascript
mix.wiredep(type, config, opts);
```
 * **type** - a string with the type of file `'php','sass','scss','less'`
 * **config** - an object with the configs for the laravel-elixir-wiredep package
 * **opts** - an object with the configs for the wiredep package, you can get more info about it [here](https://github.com/taptapship/wiredep#configuration)

These are the default wrapper options and the default wiredep options for each type of file:
```javascript
sass: {
  config: {
    baseDir: 'resources/assets/sass',
    src: false,
    searchLevel: '**/*.sass'
  },
  opts: {
    ignorePath: ''
  }
},
scss: {
  config: {
    baseDir: 'resources/assets/sass',
    src: false,
    searchLevel: '**/*.scss'
  },
  opts: {
    ignorePath: ''
  }
},
less: {
  config: {
    baseDir: 'resources/assets/less',
    src: false,
    searchLevel: '**/*.less'
  },
  opts: {
    ignorePath: ''
  }
},
php: {
  config: {
    baseDir: 'resources/views/',
    src: false,
    searchLevel: '**/*.php'
  },
  opts: {
    ignorePath: /(\..\/)*(public)?/,
    fileTypes: {
      php: {
        block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
        detect: {
          js: /<script.*src=['"]([^'"]+)/gi,
          css: /<link.*href=['"]([^'"]+)/gi
        },
        replace: {
          js: '<script src="{{filePath}}"></script>',
          css: '<link rel="stylesheet" href="{{filePath}}" />'
        }
      }
    }
  }
}
```

You can override the default options, by just passing them as second and third options or in case of PHP files you can omit the first parameter `type` and just pass the options.
```javascript
var elixir = require('laravel-elixir');
require('laravel-elixir-wiredep');

elixir(function(mix) {
    mix.wiredep('php',{ src: 'master.blade.php' }, { ignorePath: null } );
    //if your first parameter is php you can omit it and achieve the same result
    mix.wiredep({ src: 'master.blade.php' }, { ignorePath: null } );
});
```


## Examples

### PHP

#### Wiredep one PHP file
This is an example of a Gulp file that Wiredeps **only** your **javascript** and **CSS** dependencies into the `resources/views/master.blade.php`:
```javascript
var elixir = require('laravel-elixir');
require('laravel-elixir-wiredep');

elixir(function(mix) {
    mix.wiredep({src: 'master.blade.php'});
});
```



#### Wiredep multiple PHP files
This is an example of a Gulp file that Wiredeps **only** your **javascript** and **CSS** dependencies into all the PHP files, inside the `resources/views/ folder`,  that have the bower tags:
```javascript
var elixir = require('laravel-elixir');
require('laravel-elixir-wiredep');

elixir(function(mix) {
    mix.wiredep();
});
```

### Styles

#### Scss
This one is an example of a Gulp file that Wiredeps **only** your **scss** dependencies into your Scss file and compiles it into the `public/css/app.css`:
```javascript
var elixir = require('laravel-elixir');
require('laravel-elixir-wiredep');

elixir(function(mix) {
    mix.wiredep('scss')
    .sass('app.scss');
});
```
On your **app.scss** just add the bower comments.
```sass
// bower:scss
// endbower
@import "someLocalScssFile";

$white: #ffffff;
$black: #000000;
```

#### Sass
This one is an example of a Gulp file that Wiredeps **only** your **sass** dependencies and compiles your Sass file into the `public/css/app.css`:
```javascript
var elixir = require('laravel-elixir');
require('laravel-elixir-wiredep');

elixir(function(mix) {
    mix.wiredep('sass')
    .sass('app.sass');
});
```
On your **app.sass** just add the bower comments.
```sass
// bower:sass
// endbower
@import "someLocalSassFile";

$white: #ffffff;
$black: #000000;
```

#### Less
This one is an example of a Gulp file that Wiredeps **only** your **less** dependencies and compiles your Less file into the `public/css/app.css`:
```javascript
var elixir = require('laravel-elixir');
require('laravel-elixir-wiredep');

elixir(function(mix) {
    mix.wiredep('less')
    .less('app.less');
});
```
On your **app.less** just add the bower comments.
```less
// bower:less
// endbower
@import "someLocalSassFile";

$white: #ffffff;
$black: #000000;
```

### Multiple Wiredeps
If you want to Wiredep your sass/scss/less styles and also Wiredep Javascript and/or css into your PHP files, you just have to Wiredep twice.

```javascript
var elixir = require('laravel-elixir');
require('laravel-elixir-wiredep');

elixir(function(mix) {
    mix.wiredep('scss')
    .sass('app.scss')
    .wiredep();
});
```
