var gulp = require('gulp'),
    config = require('../config'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

function copyPages() {
    var stream =  gulp.src(config.pages.src + '/**/*.html')
        .pipe(gulp.dest(config.pages.dest))
        .pipe(reload({stream:true}));

    return stream;
}

gulp.task('copy:pages', copyPages);
