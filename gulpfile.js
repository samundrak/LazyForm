var gulp = require('gulp');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');

// var sourcemaps  = require('gulp-sourcemaps');

gulp.task('transpiler', function() {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outDir: 'dist/compiled'
        }))
        .pipe(gulp.dest('dist/compiled'));
});

gulp.task('uglify', ['transpiler'], function() {
    return gulp.src('dist/compiled/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/minified'));
});

gulp.task('cleaner', ['transpiler'], function() {
    return gulp.src('public/javascripts/lazyform.min.js')
        .pipe(clean({ forced: true }));
});

// gulp.task('concat', ['cleaner'], function() {
//     return gulp.src(['dist/minified/**/*.js', 'node_modules/laravel-validator-for-js/dist/validator.min.js'])
//         .pipe(concat('lazyform.min.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(gulp.dest('public/javascripts'));
// });
gulp.task('concat', ['cleaner'], function() {
    return gulp.src(['dist/compiled/**/*.js', 'node_modules/laravel-validator-for-js/dist/validator.min.js'])
        .pipe(concat('lazyform.min.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('build', ['transpiler', 'cleaner', 'concat']);
gulp.task('watch', ['build'], function() {
    livereload({ start: true })
    gulp.watch('src/**/*.ts', ['build']);
});
gulp.task('default', ['watch']);
