var gulp = require('gulp');
var config = require('../config');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('concat', function () {
    gulp.src([
            './app/assets/vendor/bower_components/jquery/jquery.js',
            './app/assets/scripts/plugins.js',
            './app/assets/scripts/plugins/**.js',
            './app/assets/scripts/script.js'
        ])
        .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest( config.js.dest ))
        .pipe(reload({stream:true}));
});
