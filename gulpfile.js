var gulp = require('gulp'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');
var livereload = require('gulp-livereload');


gulp.task('styles', function(){
  gulp.src(['public/scss/style.scss'])
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('public/css/'))
    .pipe(livereload())
});

gulp.task('scripts', function(){
  return gulp.src('public/app/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))
    .pipe(livereload())
});

gulp.task('reload', function(){
  livereload();
})

gulp.task('default', function(){
   livereload.listen();
  // making gulp generate map files takes a few additional steps
  // so we're continueing to use express for now.
  //gulp.watch("public/scss/**/*.scss", ['styles']);
  gulp.watch('public/scss/*.scss', ['reload']);
  gulp.watch("public/app/**/*.js", ['scripts']);
  gulp.watch("public/app/**/*.html", ['reload']);
});
