var gulp = require('gulp');

gulp.task('watch', function(){

  gulp.watch([
    './app/assets/scripts/**'
  ], ['concat']);

  gulp.watch('./app/assets/scss/*.scss', ['styles']);

  gulp.watch('./app/assets/images/**', ['images']);

});
