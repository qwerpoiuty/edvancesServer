// All used modules.
var gulp = require('gulp');
var babel = require('gulp-babel');
var runSeq = require('run-sequence');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var karma = require('karma').server;
var istanbul = require('gulp-istanbul');
var notify = require('gulp-notify');
var merge = require('merge-stream');

// Development tasks
// --------------------------------------------------------------

// Live reload business.
gulp.task('reload', function() {
    livereload.reload();
});

gulp.task('reloadCSS', function() {
    return gulp.src('./public/style.css').pipe(livereload());
});

gulp.task('lintJS', function() {

    return gulp.src(['./browser/js/**/*.js', './server/**/*.js'])
        .pipe(plumber({
            errorHandler: notify.onError('Linting FAILED! Check your gulp process.')
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});

gulp.task('buildJS', ['lintJS'], function() {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'));
});

gulp.task('testServerJS', function() {
    require('babel-register');
    //testing environment variable 
    process.env.NODE_ENV = 'testing';
    return gulp.src('./tests/server/**/*.js', {
        read: false
    }).pipe(mocha({
        reporter: 'spec'
    }));
});

gulp.task('testServerJSWithCoverage', function(done) {
    //testing environment variable 
    process.env.NODE_ENV = 'testing';
    gulp.src('./server/**/*.js')
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function() {
            gulp.src('./tests/server/**/*.js', {
                    read: false
                })
                .pipe(mocha({
                    reporter: 'spec'
                }))
                .pipe(istanbul.writeReports({
                    dir: './coverage/server/',
                    reporters: ['html', 'text']
                }))
                .on('end', done);
        });
});

gulp.task('testBrowserJS', function(done) {
    //testing environment variable 
    process.env.NODE_ENV = 'testing';
    karma.start({
        configFile: __dirname + '/tests/browser/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('buildPublicCSS', function() {



    var scssStream = gulp.src('./browser/scss/main.scss')
        .pipe(sass())
        .pipe(concat('scss-files.scss'));

    var cssStream = gulp.src(['./browser/theme/custom.css'])
        .pipe(concat('css-files.css'));

    var mergedStream = merge(scssStream, cssStream)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./public'));

    return mergedStream;

    // var sassCompilation = sass();
    // sassCompilation.on('error', console.error.bind(console));

    // return gulp.src('./browser/scss/main.scss')
    //     .pipe(plumber({
    //         errorHandler: notify.onError('SASS processing failed! Check your gulp process.')
    //     }))
    //     .pipe(sourcemaps.init())
    //     .pipe(sassCompilation)
    //     .pipe(sourcemaps.write())
    //     .pipe(rename('style.css'))
    //     .pipe(gulp.dest('./public'));
});

gulp.task('buildPrivateCSS', function() {
    var lessStream = gulp.src('./browser/theme/less/_main.less')
        .pipe(less())
        .pipe(concat('less-files.less'));

    var cssStream = gulp.src(['./browser/theme/app.css', './browser/theme/font.css', './browser/theme/jquery.e-calendar.css', './material-design-icons.css', './browser/theme/md.css', './browser/theme/private-custom.css'])

    var mergedStream = merge(lessStream, cssStream)
        .pipe(concat('private-styles.css'))
        .pipe(gulp.dest('./public'))

    return mergedStream
})

// Production tasks
// --------------------------------------------------------------

gulp.task('buildCSSProduction', function() {
    return gulp.src('./browser/scss/main.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public'))
});

gulp.task('buildJSProduction', function() {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

gulp.task('buildProduction', ['buildCSSProduction', 'buildJSProduction']);

// Composed tasks
// --------------------------------------------------------------

gulp.task('build', function() {
    if (process.env.NODE_ENV === 'production') {
        runSeq(['buildJSProduction', 'buildCSSProduction']);
    } else {
        runSeq(['buildJS', 'buildPublicCSS', 'buildPrivateCSS']);
    }
});

gulp.task('default', function() {

    gulp.start('build');

    // Run when anything inside of browser/js changes.
    gulp.watch('browser/js/**', function() {
        runSeq('buildJS', 'reload');
    });

    // Run when anything inside of browser/scss changes.
    gulp.watch('browser/scss/**', function() {
        runSeq('buildCSS', 'reloadCSS');
    });
    gulp.watch('browser/theme/**', function() {
        runSeq('buildCSS', 'reloadCSS');
    });

    gulp.watch('server/**/*.js', ['lintJS']);

    // Reload when a template (.html) file changes.
    gulp.watch(['browser/**/*.html', 'server/app/views/*.html'], ['reload']);

    // Run server tests when a server file or server test file changes.
    gulp.watch(['tests/server/**/*.js'], ['testServerJS']);

    // Run browser testing when a browser test file changes.
    gulp.watch('tests/browser/**/*', ['testBrowserJS']);

    livereload.listen();

});