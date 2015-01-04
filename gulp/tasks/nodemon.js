var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('dev', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        watch: [
            './server'
        ]
    })
    .on('restart', function () {
        console.log('restarted!');
    });
});
