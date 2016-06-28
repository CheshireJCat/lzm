/*
npm install gulp js-hint gulp-jshint gulp-uglify gulp-rename gulp-clean gulp-concat gulp-notify gulp-livereload --save-dev
*/
// 插件
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');

// scripts
gulp.task('scripts', function() {  
  return gulp.src('./lzm.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(livereload());
});

// clean
gulp.task('clean', function() {  
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

// default
gulp.task('default', ['clean'], function() {  
    gulp.start('scripts');
});

// watch
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./*.js', ['scripts']);
});