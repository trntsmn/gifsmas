var gulp = require('gulp'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');


gulp.task('styles', function(){
  gulp.src(['public/scss/style.scss'])
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('public/css/'))
});

gulp.task('scripts', function(){
  return gulp.src(['public/app/**/*.js', 'public/app/common/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))
});

gulp.task('default', function(){
  // making gulp generate map files takes a few additional steps
  // so we're continueing to use express for now.
  //gulp.watch("public/scss/**/*.scss", ['styles']);
  gulp.watch('public/scss/*.scss', ['scripts']);
  gulp.watch("public/app/**/*.js", ['scripts']);
  gulp.watch("public/app/**/*.html", ['scripts']);
});
