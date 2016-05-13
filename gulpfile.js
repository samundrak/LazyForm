var gulp = require('gulp');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
// var sourcemaps  = require('gulp-sourcemaps');

gulp.task('form', function() {
    return gulp.src(['src/validator.ts', 'src/Form.ts', 'src/Utils.ts'])
        .pipe(ts({
            noImplicitAny: true,
            outDir: 'dist/compiled'
        }))
        .pipe(gulp.dest('dist/compiled'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/minified'))
        .pipe(concat('lazyform.min.js'))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('public/javascripts'));

});
gulp.task('watch', ['form'], function() {
    gulp.watch('src/**/*.ts', ['form']);
});
