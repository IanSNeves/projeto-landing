const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// Autoprefixer está temporariamente removido
const browserSync = require('browser-sync').create();

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

// Função 'watch' corrigida para sinalizar a conclusão
function watch(done) {
    server();

    gulp.watch('src/scss/**/*.scss', compileSass);
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
    done();
}

exports.default = gulp.series(compileSass, watch);
exports.sass = compileSass;