module.exports = function( grunt ) {

  grunt.initConfig({

    watch: {
      files: [
        'public/common/css/style.css'
      ],
      tasks: ['cssmin']
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'public/common/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'public/common/css/',
        ext: '.min.css'
      }
    }

  });


  //Load the npm tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default grunt task to be run by node when the app starts in dev
  grunt.registerTask('default', ['watch']);

  //Ready app for production
  grunt.registerTask('production', ['cssmin']);

};
