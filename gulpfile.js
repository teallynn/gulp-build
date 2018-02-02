'use strict';

/************Dependencies**********************/
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del');


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
        .pipe(gulp.dest('css'));
});

gulp.task('styles', ['compileSass'], function() {
    return gulp.src('css/global.css')
        .pipe(cleanCSS())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('dist/styles'));
});


/*******************Images*************************/



/********************Clean*************************/
gulp.task('clean', function() {
  del(['dist', 'all*.js*', 'all*.css*']);
});


/********************Watch*************************/
gulp.task('watchFiles', function() {
  gulp.watch('sass/**/*.scss', ['compileSass']);
  gulp.watch(['js/global.js', 'js/circle/*'], ['concatScripts']);
});


/***********************Serve***********************/
gulp.task('serve', ['watchFiles']);


/*********************Build************************/
gulp.task('build', ['scripts', 'styles'])


/********************Default***********************/
gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
