var gulp       = require('gulp');
var config     = require('../config');
var changed    = require('gulp-changed');
var csso   = require('gulp-csso');

gulp.task('css-min', function() {
    var dest = config.css.dest;

    return gulp.src( dest + '/*.css' )
        .pipe(changed(dest)) // Ignore unchanged files
        .pipe(csso()) // Optimize
        .pipe(gulp.dest(dest));
});
