var gulp = require('gulp');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var uglify =  require('gulp-uglify');
gulp.task('form', function() {
    return gulp.src('src/Form.ts')
        .pipe(ts({
            noImplicitAny: true,
            outDir: 'public/javascripts/ts'
        }))
        .pipe(gulp.dest('public/javascripts/ts'))
        // .pipe(gulp.dest('dist/'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));

});
gulp.task('watch', ['form'], function() {
    gulp.watch('src/**/*.ts', ['form']);
});
