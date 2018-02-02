'use strict';

/************Dependencies**********************/
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
imagemin = require('gulp-imagemin'),
     del = require('del'),
sequence = require('run-sequence'),
browserSync = require('browser-sync').create();


/***************Scripts - JS*********************/
gulp.task('concatScripts', function () {
  return gulp.src([
        'js/global.js',
        'js/circle/circle.js',
        'js/circle/autogrow.js'])
      .pipe(maps.init())
      .pipe(concat('./all.js'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts', ['concatScripts'], function() {
    return gulp.src('dist/scripts/all.js')
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});


/***************Styles - CSS***********************/
gulp.task('compileSass', function() {
  return gulp.src('sass/global.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('styles', ['compileSass'], function() {
    return gulp.src('css/global.css')
        .pipe(cleanCSS())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('dist/styles'));
});


/*******************Images*************************/
gulp.task('images', function() {
  return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'));
});


/********************Clean*************************/
gulp.task('clean', function() {
  del(['dist', 'css', 'all*.js*', 'all*.css*']);
});


/********************Watch*************************/
gulp.task('watchFiles', function() {
  browserSync.init({server: './'});
  gulp.watch(['sass/**/**/*.scss', 'sass/**/**/*.sass'], ['styles']).on('change', browserSync.reload);
});

/*********************Build************************/
gulp.task('build', function() {
  sequence('clean', ['scripts', 'styles', 'images']);
});


/********************Default***********************/
gulp.task("default", function() {
  gulp.start(['build', 'watchFiles'])
});
