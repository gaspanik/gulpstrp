var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var prettify = require('gulp-prettify');
var rename = require('gulp-rename');
var minify = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');

gulp.task('html', function() {
  return gulp.src('pages/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist'));
});

gulp.task('prettify', ['html'], function() {
  return gulp.src('dist/*.html')
    .pipe(prettify({
      brace_style: 'collapse',
      indent_size: 2,
      indent_char: ' '
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('less', function() {
  return gulp.src('less/bootstrap.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minify())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function() {
  return gulp.src([
      'js/transition.js',
      'js/alert.js',
      'js/button.js',
      'js/collapse.js',
      'js/dropdown.js',
      'js/tooltip.js',
      'js/tab.js'
    ])
    .pipe(concat('bootstrap.tmp.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(shell([
      'cat includes/bs-license.txt dist/js/bootstrap.tmp.js > dist/js/bootstrap.min.js',
      'rm dist/js/bootstrap.tmp.js'
    ]));
});

gulp.task('watch', function() {
  gulp.watch(['pages/*', 'includes/*.md'], ['prettify']);
  gulp.watch(['less/**'], ['less']);
});

gulp.task('default', ['prettify', 'less', 'scripts', 'watch']);
