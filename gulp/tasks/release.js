var gulp = require('gulp');

gulp.task('release', ['clean', 'build', 'uglify', 'css-min']);
