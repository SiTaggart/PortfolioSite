var gulp       = require('gulp');
var config     = require('../config');
var changed    = require('gulp-changed');
var csso   = require('gulp-csso');

gulp.task('css-min', ['styles'], function() {
    var dest = config.css.dest;

    var stream = gulp.src( dest + '/*.css' )
        .pipe(csso()) // Optimize
        .pipe(gulp.dest(dest));

    return stream;
});
