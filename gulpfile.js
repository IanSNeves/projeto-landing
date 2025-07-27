const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const terser = require('gulp-terser');

function compileSass() {
    return gulp.src('src/scss/main.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
}

function server() {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });
}

function watch(done) {
    server();

    gulp.watch('src/scss/**/*.scss', compileSass);
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
    done();
}

function cleanDist() {
    return gulp.src('dist', { read: false, allowEmpty: true })
        .pipe(clean());
}

function buildHTML() {
    return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
}

function buildCSS() {
    return gulp.src('src/scss/main.scss')
    .pipe(sass({ outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
}

function buildJS() {
    return gulp.src('src/js/main.js')
        .pipe(terser()) 
        .pipe(gulp.dest('dist/js'));
}


function buildImages() {
    return gulp.src('src/assets/images/**/*') 
        .pipe(gulp.dest('dist/assets/images'));
}

exports.build = gulp.series(cleanDist, gulp.parallel(buildHTML, buildCSS, buildJS, buildImages));
exports.default = gulp.series(compileSass, watch);
exports.sass = compileSass;