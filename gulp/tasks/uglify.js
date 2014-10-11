var gulp = require('gulp');
var config = require('../config');
var uglify = require('gulp-uglifyjs');

gulp.task('uglify', function() {

    var dest = config.js.dest;

    gulp.src( dest + '/app.js')
        .pipe(uglify('app.js', {
            outSourceMap: true
        }))
        .pipe(gulp.dest( dest ));
});
