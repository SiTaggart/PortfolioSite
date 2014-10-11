var gulp        = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browsersync', function() {
  browserSync({
    proxy: "localhost:8000",
    open: true,
    /* Hide the notification. It gets annoying */
    notify: {
      styles: ['opacity: 0', 'position: absolute']
    }
  });
});


