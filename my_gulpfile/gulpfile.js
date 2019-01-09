'use strict';

// ================================================
//			Connecting modules
// ================================================
const
    gulp 	 = require('gulp'),
    sass 	 = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    cssnano  = require('gulp-cssnano'),
    concat   = require('gulp-concat'),
    uglify   = require('gulp-uglify-es').default;


// ================================================
//			Variables
// ================================================
let
    src = {
        js: [
            'js/classes.js',
            'js/function.js',
            'js/base.js'
        ],
        all_js: 'js/**/*.js',
        sass: 'sass/**/*.sass'
    },
    dest = {
        js: 'electron/js',
        css: 'electron/css'
    }

// ================================================
//			Functions
// ================================================
function styles() {
	return gulp.src(src.sass)
		.pipe(sass())
		.pipe(prefixer({browsers: ['last 2 versions'], cascade: false}))
		.pipe(cssnano({discardUnused: {fontFace: false}}))
		.pipe(gulp.dest(dest.css))
}

function scripts() {
	return gulp.src(src.js)
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dest.js))
}

function watchFiles() {
	gulp.watch(src.sass, styles)
	gulp.watch(src.all_js, scripts)
}

gulp.task('styles', styles)
gulp.task('scripts', scripts)
gulp.task('default', gulp.series('styles', 'scripts', 'watch'))