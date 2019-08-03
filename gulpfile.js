const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulp = require('gulp');
const uglify = require('gulp-uglifyjs');
const copy = require('gulp-copy');
const imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
const imgSrc = 'src/img/**/*.{png,jpg}';
const imgDest = 'dist/img/';

gulp.task('scripts', () => {
    return gulp.src([
        'src/js/jquery-3.4.1.min.js',
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

gulp.task('imagemin', done => {
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDest));
    done();
});

gulp.task('optimizeImages', done => {
    gulp.src(imgSrc)
        .pipe(imageResize({
            width: 1000,
            height: 1000,
            imageMagick: true
        }))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDest));
    done();
});

gulp.task('default', gulp.parallel('scripts', 'optimizeImages'));
