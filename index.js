var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var elixir = require('laravel-elixir');
var path = require('path');
var wiredepConfig = require('./config');
var task = elixir.Task;

elixir.extend('wiredep', function(type, config, opts) {

  //for legacy reasons
  if(type === Object(type)){
    var config = type || {};
    var opts = config || {};
    var type = 'php';
    var typeDefaults = wiredepConfig[type];
  }else{
    var type = wiredepConfig.hasOwnProperty(type) ? type : 'php';
    var typeDefaults = wiredepConfig[type];
    var config = config || {};
    var opts = opts || {};
  }

  config.baseDir = config.baseDir || typeDefaults.config.baseDir;
  config.src = config.src || typeDefaults.config.src;
  config.searchLevel = config.searchLevel || typeDefaults.config.searchLevel;

  opts.ignorePath = opts.ignorePath || typeDefaults.opts.ignorePath;
  opts.fileTypes = opts.fileTypes || typeDefaults.opts.fileTypes;

      new task('wiredep', function() {
        var src = path.join(config.baseDir, !!config.src ? config.src : config.searchLevel);

        return gulp.src(src).pipe(wiredep(opts)).pipe(gulp.dest(config.baseDir))
      })
      .watch(opts.bowerJson || './bower.json');

});
