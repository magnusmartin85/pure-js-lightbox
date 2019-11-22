const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageResize = require('gulp-image-resize');
const imgDest = 'dist/img/';
const imgSrc = 'src/img/**/*.{png,jpg}';
const sass = require('gulp-sass');
const uglify = require('gulp-uglifyjs');

sass.compiler = require('node-sass');

gulp.task('styles', () => {
    return gulp.src('./src/scss/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('styles:watch', () => {
    gulp.watch('./src/scss/index.scss', gulp.parallel('styles'));
});

gulp.task('scripts', () => {
    return gulp.src([
        'src/js/jquery-3.4.1.min.js',
        'src/js/lightbox.js'
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

gulp.task('copyHtml', () => {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
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

gulp.task('default', gulp.parallel(
    'scripts',
    'styles',
    'optimizeImages',
    'copyHtml'
    )
);
