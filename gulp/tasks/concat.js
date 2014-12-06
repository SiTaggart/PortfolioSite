var gulp = require('gulp');
var config = require('../config');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('concat', ['clean:js'], function () {

    var stream = gulp.src([
            './app/assets/vendor/bower_components/angular/angular.js',
            './app/assets/scripts/app.js',
            './app/assets/scripts/**/*.js'
        ])
        .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest( config.js.dest ))
        .pipe(reload({stream:true}));

    return stream;
});
