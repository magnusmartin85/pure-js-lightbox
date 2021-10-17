const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const del = require('del');
const dependents = require('gulp-dependents');
const gulp = require('gulp');
const minifyCss = require('gulp-clean-css');
const node_dependencies = Object.keys(require('./package.json').dependencies || {});
const node_modules_folder = './node_modules/';
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');

// directories
const dist_folder = './dist/';
const dist_node_modules_folder = dist_folder + 'node_modules/';
const src_folder = './resources/';


gulp.task('clear', () => del([dist_folder]));

gulp.task('html', () => {
  return gulp.src([src_folder + '**/*.html'], {
    base: src_folder,
    since: gulp.lastRun('html')
  })
    .pipe(gulp.dest(dist_folder))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  return gulp.src([
    src_folder + 'styles/lightbox.scss'
  ])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(dependents())
    .pipe(sass({
      includePaths: ['./node_modules/normalize.css']
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(dist_folder + 'css'))
    .pipe(minifyCss())
    .pipe(rename({extname: '.min.css'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_folder + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src([src_folder + 'scripts/**/*'])
    .pipe(plumber())
    .pipe(webpack({
      mode: 'production',
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('lightbox.js'))
    .pipe(gulp.dest(dist_folder + 'js'))
    .pipe(uglify({
      output: {
        comments: /^!/
      }
    }))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(dist_folder + 'js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_folder + 'js'))
    .pipe(browserSync.stream());
});

gulp.task('vendor', () => {
  if (node_dependencies.length === 0) {
    return new Promise((resolve) => {
      console.log('No dependencies specified');
      resolve();
    });
  }

  return gulp.src(node_dependencies.map(dependency => node_modules_folder + dependency + '/**/*.*'), {
    base: node_modules_folder,
    since: gulp.lastRun('vendor')
  })
    .pipe(gulp.dest(dist_node_modules_folder))
    .pipe(browserSync.stream());
});

gulp.task('build', gulp.series('clear', 'html', 'sass', 'js', 'vendor', 'img'));

gulp.task('dev', gulp.series('html', 'sass', 'js', 'img'));

gulp.task('serve', () => {
  return browserSync.init({
    server: {
      baseDir: ['dist']
    },
    port: 3000,
    open: false
  });
});

gulp.task('watch', () => {
  const watchVendor = [];

  node_dependencies.forEach(dependency => {
    watchVendor.push(node_modules_folder + dependency + '/**/*.*');
  });

  const watch = [
    src_folder + '**/*.html',
    src_folder + 'styles/**/*.scss',
    src_folder + 'scripts/**/*.js'
  ];

  gulp.watch(watch, gulp.series('dev')).on('change', browserSync.reload);
  gulp.watch(watchVendor, gulp.series('vendor')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
