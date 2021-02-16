let hostname = require('./vhost.js');

let browserify = require('browserify'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  gulp = require('gulp'),
  babelify = require('babelify'),
  sass = require('gulp-dart-sass'),
  prefix = require('gulp-autoprefixer'),
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
    cssDist: './',
  };

function scripts() {
  let b = browserify();
  b.transform(
    babelify.configure({
      presets: ['@babel/preset-react', '@babel/preset-env'],
      plugins: [['@babel/transform-react-jsx', { pragma: 'h' }]],
    })
  );
  b.add(paths.scripts);
  return b
    .bundle()
    .pipe(source('scripts.js'))
    .pipe(gulp.dest(paths.scriptsDist))
    .pipe(reload({ stream: true }));
}

function css() {
  return gulp
    .src(paths.watchScss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
      })
    )
    .pipe(
      prefix({
        grid: false,
      }).on('error', sass.logError)
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.cssDist))
    .pipe(reload({ stream: true }));
}

function cssProd() {
  return gulp
    .src(paths.watchScss)
    .pipe(sourcemaps.init({ loadMaps: false }))
    .pipe(
      sass({
        outputStyle: 'compressed',
      })
    )
    .pipe(
      prefix({
        grid: false,
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest(paths.cssDist));
}

function compress(cb) {
  console.error(paths.scriptsDist, 'crunched!');
  pump(
    [gulp.src(paths.scriptsDistFile), uglify(), gulp.dest(paths.scriptsDist)],
    cb
  );
}

function watchFiles(done) {
  browserSync.init({
    proxy: hostname.vhost,
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn(snippet, match) {
          return snippet + match;
        },
      },
    },
  });
  gulp.watch(paths.watchJS, scripts);
  gulp.watch(paths.watchScss, css);
  done();
}

const build = gulp.parallel(compress, cssProd);

gulp.task('default', watchFiles);
gulp.task('production_build', build);
