'use strict';

var gulp = require('gulp'),
    cdnizer = require('gulp-cdnizer'),
    config = require('../../config'),
    path = require('path');

// injects the path of the js and css files into the `target` html file
gulp.task('index', function(cb) {

    var build = gulp.args.build || gulp.args.emulate || gulp.args.run,
    // define the src and target
        src = './app/index.html',
        targetDir = path.resolve(build ? 'www' : '.tmp'),

    // define the path for each build
        cssPath = path.resolve(build ? 'www/styles/main.css' : '.tmp/styles/main.css'),
        vendorPath = path.resolve(build ? 'www/js/vendor.min.js' : '.tmp/js/vendor.js'),
        appPath = path.resolve(build ? 'www/js/app.min.js' : '.tmp/js/app.js'),

    // define the stream for each build
        cssStream = gulp.src([cssPath], {read: false}),
        vendorStream = gulp.src([vendorPath], {read: false}),
        appStream = gulp.src([appPath], {read: false}),

    // define options to pass to the `inject` task
        options = {addRootSlash: false},
        vendorOptions = {addRootSlash: false, starttag: '<!-- inject:head:{{ext}} -->'};

    // ignore the root path according to which build
    options.ignorePath = build ? 'www' : '.tmp';
    vendorOptions.ignorePath = build ? 'www' : '.tmp';

    gulp.src(src)
        .pipe(gulp.plugins.inject(cssStream, options))
        .pipe(gulp.plugins.inject(vendorStream, vendorOptions))
        .pipe(gulp.plugins.inject(appStream, options))
        .pipe(gulp.plugins.print())
        .pipe(gulp.dest(targetDir))
        .on('error', errorHandler);
    cb();
});

// Handle errors
function errorHandler(error) {
    gulp.plugins.util.log('Gulp index Error: ', error.toString());
    /*jshint validthis:true */
    this.emit('end');
}
