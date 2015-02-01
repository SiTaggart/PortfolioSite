var gulp = require('gulp'),
    concat = require('gulp-concat'),
    html2js = require('gulp-html2js'),
    config = require('../config'),
    handleErrors = require('../util/handleErrors');

function portfolioTemplates() {

    var stream = gulp.src([
        config.js.src + '/**/*.tpl.html'
    ])
        .pipe(html2js({
            outputModuleName: 'portfolio-templates',
            useStrict: true
        }))
        .on('error', handleErrors)
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(config.js.build));

    return stream;

}

gulp.task('html2js', portfolioTemplates);
