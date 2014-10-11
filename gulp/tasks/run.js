var gulp = require('gulp');

gulp.task('run', ['clean', 'concat', 'styles', 'images', 'watch', 'connect', 'browsersync']);
