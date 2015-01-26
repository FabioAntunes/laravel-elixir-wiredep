var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var elixir = require('laravel-elixir');
var utilities = require('laravel-elixir/ingredients/commands/Utilities');

elixir.extend('wiredep', function(config, opts) {

  var config = config || {};
  var opts = opts || {};

  config.baseDir = config.baseDir || 'resources/views/';
  config.src = config.src || false;
  config.searchLevel = config.searchLevel || '**/*.php';
  
  opts.ignorePath = opts.ignorePath || /(\..\/)*public\//;
  opts.fileTypes = opts.fileTypes || {
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
      };

  src = utilities.buildGulpSrc(config.src, config.baseDir, config.searchLevel);

  gulp.task('wiredep', function() {
    gulp.src(src)
    .pipe(wiredep(opts))
    .pipe(gulp.dest(config.baseDir));
  });

  this.registerWatcher('wiredep', opts.bowerJson || './bower.json');

  return this.queueTask('wiredep');

});