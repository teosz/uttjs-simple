'use strict';
var mountFolder;

mountFolder = function(connect, dir) {
  return connect["static"](require('path').resolve(dir));
};

module.exports = function(grunt) {
  var yeomanConfig;
  require('load-grunt-tasks')(grunt);

  yeomanConfig = {
    src: 'src',
    dist: 'dist'
  };
  grunt.initConfig({
    yeoman: yeomanConfig,
    clean: {
        dist: {
            files: [{
                dot: true,
                src: [
                    '.tmp',
                    '<%= yeoman.dist %>/*',
                    '!<%= yeoman.dist %>/.git*'
                ]
            }]
        },
        server: '.tmp'
    },
    connect: {
        options: {
            port: 9000,
            open: true,
            livereload: 35729,
            hostname: '0.0.0.0'
        },
        livereload: {
            options: {
                open: true,
                base: '.tmp'
            }
        },
        dist: {
            options: {
                base: '<%= yeoman.dist %>',
                livereload: false
            }
        }
    },
    copy: {
      demo: {
        src: ['demo/**/*', 'doc/**/*'],

        dest: '.tmp/',
      },
      dist: {
        expand: true,
        cwd : 'dist',
        src: 'utt.min.js',
        dest: '.tmp/',
      },
      srv: {
        expand: true,
        cwd : '.srv',
        src: '**/*',
        dest: '.tmp/',
      },
    },
    watch: {
      scripts: {
        files: ['src/*.js'],
        tasks:  ['uglify', 'copy:dist'],
        options: {
          reload: true
        }
      },
    },
    uglify: {
      build: {
        src: '<%=yeoman.src %>/utt.js',
        dest: '<%=yeoman.dist %>/utt.min.js'
      }
    },
    jsdoc : {
        dist : {
            src: ['src/*.js', 'README.md'],
            jsdoc: './node_modules/.bin/jsdoc',
            options: {
                template: './node_modules/ink-docstrap/template',
                destination: 'doc',
            }
        }
    },
    mochaTest: {
      test: {

        src: ['test/**/*.js']
      }
    }
  });
  grunt.registerTask('default', ['mochaTest', 'uglify']);
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('doc', ['jsdoc']);

  grunt.registerTask('serve', ['build', 'clean:server', 'jsdoc', 'copy', 'connect:livereload','watch']);


};
