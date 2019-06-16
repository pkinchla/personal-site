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
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    paths = {
        scripts: './static/js/scripts.js',
        scriptsDistFile: './js/scripts.js',
        scriptsDist: './js/',
        watchJS: './static/js/**/*.js',
        watchScss: './static/css/**/*.scss',
        cssDist: './'
    }

    gulp.task('js', [], function(){
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
        .pipe(gulp.dest(paths.scriptsDist))
        .pipe(browserSync.stream())
})

gulp.task('sass', function () {
  return gulp.src(paths.watchScss)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(prefixer({
      browsers: ['last 3 versions']
    }).on('error', sass.logError).on('end', reload))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.cssDist))
})

gulp.task('sass_production', function(){
    return gulp.src(paths.watchScss)
    .pipe(sourcemaps.init({loadMaps:false}))
    .pipe(sass({
      outputStyle: 'compress'
    }))
    .pipe(prefixer({
      browsers: ['last 3 versions']
    }).on('error', sass.logError).on('end', reload))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.cssDist))
})

gulp.task('compress', function (cb) {
  console.error(paths.scriptsDist, 'crunched!');
  pump([
    gulp.src(paths.scriptsDistFile),
    uglify(),
    gulp.dest(paths.scriptsDist)
    ],
    cb
  );
});

gulp.task('build', ['js', 'sass']);


gulp.task('watch', [], function(done){
    gulp.watch(paths.watchJS, ['js']);
    gulp.watch(paths.watchScss, ['sass']);
});

gulp.task('sync', function() {
  browserSync.init({
    proxy:hostname.vhost
  });
});

gulp.task('production_build', ['compress', 'sass_production']);

gulp.task('default', ['build', 'watch', 'sync']);