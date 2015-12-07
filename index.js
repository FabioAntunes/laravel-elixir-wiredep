var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var elixir = require('laravel-elixir');
var path = require('path');
var task = elixir.Task;

elixir.extend('wiredep', function(config, opts) {

  var config = config || {};
  var opts = opts || {};

  config.baseDir = config.baseDir || 'resources/views/';
  config.src = config.src || false;
  config.searchLevel = config.searchLevel || '**/*.php';

  opts.ignorePath = opts.ignorePath || /(\..\/)*(public)?/;
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
        },
        less: {
          block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
          detect: {
              css: /@import\s['"](.+css)['"]/gi,
              less: /@import\s['"](.+less)['"]/gi
          },
          replace: {
              css: '@import "{{filePath}}";',
              less: '@import "{{filePath}}";'
          }
        },
        sass: {
          block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
          detect: {
              css: /@import\s(.+css)/gi,
              sass: /@import\s(.+sass)/gi,
              scss: /@import\s(.+scss)/gi
          },
          replace: {
              css: '@import {{filePath}}',
              sass: '@import {{filePath}}',
              scss: '@import {{filePath}}'
          }
        },
        scss: {
          block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
          detect: {
              css: /@import\s['"](.+css)['"]/gi,
              sass: /@import\s['"](.+sass)['"]/gi,
              scss: /@import\s['"](.+scss)['"]/gi
          },
          replace: {
              css: '@import "{{filePath}}";',
              sass: '@import "{{filePath}}";',
              scss: '@import "{{filePath}}";'
          }
        }
      };

      new task('wiredep', function() {
        var src = path.join(config.baseDir, !!config.src ? config.src : config.searchLevel);

        return gulp.src(src).pipe(wiredep(opts)).pipe(gulp.dest(config.baseDir))
      })
      .watch(opts.bowerJson || './bower.json');

});