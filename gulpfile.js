var gulp   = require('gulp');
var clean  = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var sources = 'src/animate-scroll-to.js';
var targets = 'dist/animate-scroll-to.{js,min.js,min.json.map}';

function remove() {
  return gulp.src(targets)
    .pipe(clean()); 
}

// development version
function development() {
  return gulp.src(sources)
    .pipe(concat('animate-scroll-to.js', { newLine: '\n\n' }))
    .pipe(gulp.dest('./dist'));
}

// minified version
function minifiy() {
  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(concat('animate-scroll-to.min.js', { newLine: '\n\n' }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
}

const compress = gulp.parallel(development, minifiy);

exports.remove = remove;
exports.compress = compress;
exports.default = gulp.series(remove, compress);