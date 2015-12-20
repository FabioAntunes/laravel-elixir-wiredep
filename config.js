var configs = {
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
};

module.exports = configs;
