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
