var gulp = require('gulp');
var config = require('../config');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var handleErrors = require('../util/handleErrors');

gulp.task('styles', ['clean:styles'], function () {

    var stream = gulp.src( config.css.src + '/**/*.scss' )
        .pipe(sass())
        .on('error', handleErrors)
        .pipe(autoprefixer('last 2 versions', 'ie9', 'ios7'))
        .pipe(gulp.dest( config.css.dest ))
        .pipe(reload({stream:true}));

    return stream;
});
