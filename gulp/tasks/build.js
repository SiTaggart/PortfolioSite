var gulp = require('gulp');

gulp.task('build', [
    'concat',
    'styles',
    'images',
    'svg',
    'copy:pages'
]);
