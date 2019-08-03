const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulp = require('gulp');
const uglify = require('gulp-uglifyjs');
const copy = require('gulp-copy');

gulp.task('scripts', () => {
    return gulp.src([
        'src/js/jquery-1.12.1.min.js',
        'src/js/jquery.lazyload.min.js',
        'src/js/gallery.js'
    ])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('uglify', done => {
    gulp.src('dist/js/app.js')
        .pipe(uglify('app.min.js'))
        .pipe(gulp.dest('dist/js'));
    done();
});

gulp.task('copyFonts', () => {
    return gulp.src('src/fonts/**/*')
        .pipe(copy('dist'))
});
