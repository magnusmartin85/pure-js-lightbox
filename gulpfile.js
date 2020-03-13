const gulp = require('gulp');
const imageResize = require('gulp-image-resize');
const imgSrc = 'src/images/**/*.{png,jpg}';
const imgDest = 'dist/images/';

gulp.task('optimizeImages', done => {
    gulp.src(imgSrc)
        .pipe(imageResize({
            width: 1200,
            height: 1200,
            imageMagick: true
        }))
        .pipe(gulp.dest(imgDest));
    done();
});

gulp.task('default', gulp.series(
    'optimizeImages'
    )
);
