var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src(['src/js/modernizr-2.8.3.min.js', 'src/js/jquery-1.12.1.min.js', 'src/js/jquery.lazyload.min.js', 'src/js/gallery.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('uglify', function() {
    gulp.src('dist/js/app.js')
        .pipe(uglify('app.min.js'))
        .pipe(gulp.dest('dist/js'))
});
