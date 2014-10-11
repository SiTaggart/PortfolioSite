var gulp = require('gulp');

gulp.task('release', ['clean', 'concat', 'uglify', 'styles', 'css-min', 'images']);
