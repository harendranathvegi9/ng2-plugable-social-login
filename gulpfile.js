var gulp = require('gulp');
var usemin = require('gulp-usemin');

gulp.task('default', function() {
  gulp.src('./app/external/**/*.*')
  .pipe(gulp.dest('./dist/app/external/'));
  gulp.src('./app/css/**/*.*')
  .pipe(gulp.dest('./dist/app/css/'));
  gulp.src('./node_modules/font-awesome/fonts/**/*.*')
  .pipe(gulp.dest('./dist/app/external/font-awesome/fonts/'));
   gulp.src('./*.html')
     .pipe(usemin({
       html: [],
       css: [],
       js: []
     }))
     .pipe(gulp.dest('./dist/'));
  return gulp.src('./app/**/*.html')
    .pipe(usemin({
      html: [],
      css: [],
      js: []
    }))
    .pipe(gulp.dest('./dist/app/'));
});
