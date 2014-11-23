var gulp = require('gulp');
var del = require('del');
var config = require('../config');

gulp.task('clean', function(cb) {
    del([
        config.css.dest,
        config.images.dest,
        config.js.dest
    ], cb);
});

gulp.task('clean:styles', function(cb) {
    del([
        config.css.dest
    ], cb);
});

gulp.task('clean:js', function(cb) {
    del([
        config.js.dest
    ], cb);
});

gulp.task('clean:images', function(cb) {
    del([
        config.images.dest
    ], cb);
});
