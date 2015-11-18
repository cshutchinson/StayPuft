var gulp = require('gulp');
var webpack = require('gulp-webpack');
var mocha = require('gulp-mocha');

gulp.task('default', ['webpack', 'css', 'test'], function() {
  return gulp
    .src('./*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('css', function() {
  return gulp
    .src('*.css')
    .pipe(gulp.dest('./dist'));
});

gulp.task('webpack', function() {
  return gulp
    .src('main.js')
    .pipe(webpack({
      entry: {
        index: './validation.js',
        flipside: './main.js',
      },
      output: {
        filename: '[name].bundle.js',
      },
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('test', function () {
    return gulp
    .src('./test/*.js', {read: false})
    .pipe(mocha());
});
