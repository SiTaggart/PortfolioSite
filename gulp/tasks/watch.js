var gulp = require('gulp'),
    config = require('../config');

gulp.task('watch', function(){

  gulp.watch([
    config.js.src + '/**/*'
  ], ['concat']);

  gulp.watch(config.css.src + '/**/*.scss', ['styles']);

  gulp.watch(config.images.src + '/**/*', ['images']);

  gulp.watch(config.svg.src + '/**/*.svg', ['svg']);

  gulp.watch(config.pages.src + '/**/*.html', ['copy:pages']);

});
