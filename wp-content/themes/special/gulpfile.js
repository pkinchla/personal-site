var hostname = require('./vhost.js')

var browserify = require('browserify'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    gulp = require('gulp'),
    babelify = require('babelify'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify')
    pump = require('pump'),
    paths = {
        scripts: './static/js/scripts.js',
        scriptsDistFile: './js/scripts.js',
        scriptsDist: './js/',
        watchJS: './static/js/**/*.js',
        watchScss: './static/css/**/*.scss',
        cssDist: './'
    }

function scripts() {
    var b = browserify();
    b.transform(babelify.configure({
      presets: ["react", "es2015"],
      plugins: [
        ["transform-react-jsx", { "pragma":"h" }]
      ]
    }))
    b.add(paths.scripts)
    return b.bundle()
      .pipe(source('scripts.js'))
      .pipe(gulp.dest(paths.scriptsDist)
        .on('end', reload)
      )
};

function css() {
  return gulp.src(paths.watchScss)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(prefixer({
      grid: false
    }).on('error', sass.logError).on('end', reload))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.cssDist))
};

function cssProd(){
    return gulp.src(paths.watchScss)
    .pipe(sourcemaps.init({ loadMaps:false }))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(prefixer({
      grid: false
    })
    .on('error', sass.logError))
      .pipe(gulp.dest(paths.cssDist))
};

function compress(cb) {
  console.error(paths.scriptsDist, 'crunched!');
  pump([
    gulp.src(paths.scriptsDistFile),
    uglify(),
    gulp.dest(paths.scriptsDist)
    ],
    cb
  );
};

// gulp.task('build', ['js', 'sass']);

function browsersync(done) {
  browserSync.init({
    proxy:hostname.vhost
  });
  done();
}

function watchFiles() {
  gulp.watch(paths.watchJS, scripts);
  gulp.watch(paths.watchScss, css);
};


const watch = gulp.parallel(watchFiles, browsersync);
const build = gulp.parallel(compress, cssProd)


// gulp.task('production_build', ['compress', 'sass_production']);

exports.watch = watch
exports.watchFiles = watchFiles
exports.scripts = scripts
exports.css = css

gulp.task('default', watch);
gulp.task('production_build', build);