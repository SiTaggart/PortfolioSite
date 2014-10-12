var gulp = require('gulp');
var config = require('../config');
var uglify = require('gulp-uglifyjs');

gulp.task('uglify', ['concat'], function() {

    var dest = config.js.dest;

    var stream = gulp.src( dest + '/app.js')
        .pipe(uglify('app.js', {
            outSourceMap: true
        }))
        .pipe(gulp.dest( dest ));

    return stream;
});
