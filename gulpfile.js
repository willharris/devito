var gulp = require('gulp'),
    poststylus = require('poststylus'),
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('autoprefixer'),
    lost = require('lost');

var paths = {
    cssSource: 'src/stylus/',
    cssDestination: 'public/css/'
};

gulp.task('styles', function() {
    return gulp.src(paths.cssSource + '**/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [
                poststylus(['lost', 'autoprefixer'])
            ]
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.cssDestination));
});

gulp.watch(paths.cssSource + '**/*.styl', ['styles']);

gulp.task('default', ['styles']);
