module.exports = function( grunt ) {

  grunt.initConfig({

    watch: {
      cssmin: {
        files: [
          'public/common/css/style.css'
        ],
        tasks: ['cssmin']
      },
      uglify: {
        files: [
          'public/common/js/libs/*.js',
          'public/common/js/mylibs/*.js',
          'public/common/js/plugins/*.js',
          'public/common/js/plugins.js',
          'public/common/js/script.js'
        ],
        tasks: ['uglify']
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'public/common/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'public/common/css/',
        ext: '.min.css'
      }
    },

    uglify: {
      dist: {
        options: {
          mangle: false,
          sourceMap: 'public/js/map/source-map.js'
        },
        files: {
          'public/common/js/script.min.js': [
            'public/common/js/plugins.js',
            'public/common/js/plugins/*.js',
            'public/common/js/script.js'
          ]
        }
      }
    }

  });

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default grunt task to be run by node when the app starts in dev
  grunt.registerTask('default', ['watch']);

  //Ready app for production
  grunt.registerTask('production', ['cssmin']);

};
