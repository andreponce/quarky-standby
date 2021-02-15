'use strict';

var gulp = require('gulp');
var minifyCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
//var minifyInlineScripts = require('gulp-minify-inline-scripts');
var minifyInline = require('gulp-minify-inline');
var removeHtmlComments = require('gulp-remove-html-comments');
// var change = require('change');
var shell = require('gulp-shell');

gulp.task('styles', function() {
    gulp.src(['less/*.less'])
        .pipe(concat('style.min.css'))
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('../deploy/css'))
})

gulp.task('html', function() {
  gulp.src(['index.html'])
    .pipe(removeHtmlComments())
    //.pipe(minifyInlineScripts())
    .pipe(minifyInline())
    //.pipe(concat('app.html'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename({prefix: ''}))
    .pipe(gulp.dest('../deploy'))
});

gulp.task('js', function() {
  gulp.src(['js/**/*.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../deploy/js'))
});

gulp.task('serve', function () {
    gulp.watch(['less/*.less'], ['styles']);
    gulp.watch(['js/**/*.js'], ['js']);
    gulp.watch(['**/*.html'], ['html']);
});
