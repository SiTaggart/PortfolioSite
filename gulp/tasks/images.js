var gulp       = require('gulp');
var config     = require('../config');
var changed    = require('gulp-changed');
var imagemin   = require('gulp-imagemin');

gulp.task('images', ['clean:images'], function() {
    var dest = config.images.dest;

    var stream =  gulp.src( config.images.src + '/**/*' )
        .pipe(changed(dest)) // Ignore unchanged files
        .pipe(imagemin()) // Optimize
        .pipe(gulp.dest(dest));

    return stream;
});
