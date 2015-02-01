var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    config = require('../config');

function concatPortfolio() {
    var stream = gulp.src([
            './app/assets/vendor/bower_components/angular/angular.js',
            config.js.build + '/**/*.js',
            config.js.src + '/**/*.js',
            '!' + config.js.src + '/**/*.scenario.js',
            '!' + config.js.src + '/**/*.spec.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.js.dest))
        .pipe(reload({stream:true}));

    return stream;
}

gulp.task('concat', ['clean:js', 'html2js'], concatPortfolio);
