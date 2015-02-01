var gulp = require('gulp');

gulp.task('run', ['clean', 'build', 'watch', 'dev', 'browsersync']);
