var gulp       = require('gulp');
var config     = require('../config');
var changed    = require('gulp-changed');
var imagemin   = require('gulp-imagemin');

gulp.task('svg', ['clean:svg'], function() {
    var dest = config.svg.dest;

    var stream =  gulp.src( config.svg.src + '/**/*' )
        .pipe(changed(dest)) // Ignore unchanged files
        .pipe(imagemin()) // Optimize
        .pipe(gulp.dest(dest));

    return stream;
});
