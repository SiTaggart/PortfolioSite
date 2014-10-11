var gulp = require('gulp');
var config = require('../config');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('styles', function () {
    gulp.src( config.css.src )
        .pipe(sass())
        .pipe(autoprefixer('last 1 version'))
        .pipe(gulp.dest( config.css.dest ))
        .pipe(reload({stream:true}));
});
