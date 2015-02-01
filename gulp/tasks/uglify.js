var gulp = require('gulp'),
    config = require('../config'),
    handleErrors = require('../util/handleErrors'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglifyjs');


function uglifyPortfolio() {

    var stream = gulp.src(config.js.dest + '/app.js')
        .pipe(ngAnnotate())
        .pipe(uglify('app.js'))
        .on('error', handleErrors)
        .pipe(gulp.dest(config.js.dest));

    return stream;

}

gulp.task('uglify', ['clean:js', 'concat'], uglifyPortfolio);
