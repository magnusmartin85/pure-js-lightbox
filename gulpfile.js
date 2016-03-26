var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('uglify', function() {
    gulp.src('dist/js/app.js')
        .pipe(uglify('app.min.js'))
        .pipe(gulp.dest('dist/js'))
});
