var gulp = require('gulp'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');
var order = require('gulp-order');
var ngAnnotate = require('gulp-ng-annotate');


gulp.task('styles', function(){
  gulp.src(['public/scss/style.scss'])
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('public/css/'))
});

gulp.task('scripts', function(){
  return gulp.src([
    "public/components/angular/angular.js",
    "public/components/angular-route/angular-route.js",
    "public/components/angular-animate/angular-animate.js",
    "public/components/picturefill/dist/picturefill.min.js",
    "public/components/angular-picture/src/angular-picture.js",
    'public/app/*.js',
    'public/app/**/*.js'])
    .pipe(order([
      'angular.js', "angular-route.js", "angular-animate.js",
      "picturefill.min.js", 'angular-picture.js',
      'app.js', "app/**/*.module.js", 'app.service.js', 'app/**/*.js']))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(ngAnnotate({add: true}))
    .pipe(uglify({mangle: true}))
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
