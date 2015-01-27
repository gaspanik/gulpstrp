var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var rename = require('gulp-rename');
var minify = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('html', function() {
  return gulp.src('index.jade')
    .pipe(jade({
      pretty: true
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
      'js/carousel.js',
      'js/collapse.js',
      'js/dropdown.js',
      'js/modal.js',
      'js/tooltip.js',
      'js/popover.js',
      'js/scrollspy.js',
      'js/tab.js',
      'js/affix.js'
    ])
    .pipe(concat('bootstrap.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gulp.watch('*.jade', ['html']);
  gulp.watch(['less/**'], ['less']);
});

gulp.task('default', ['html', 'less', 'scripts', 'watch']);
