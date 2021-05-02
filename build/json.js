(function () {
  'use strict';

  const gulp = require('gulp');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  // json minify
  gulp.task('json', function () {
    return gulp.src('./src/*.json').pipe($.jsonMinify()).pipe(gulp.dest('dist'));
  });
})();
