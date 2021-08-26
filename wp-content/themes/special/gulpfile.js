const { src, dest, watch, series } = require("gulp");
const hostname = require("./vhost.js");
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcssImport = require("postcss-import");

function css(cb) {
  var plugins = [postcssImport(), autoprefixer(), cssnano()];
  src("./src/css/main.css")
    .pipe(postcss(plugins))
    .pipe(dest("./dist/css/"))
    .pipe(browserSync.stream());
  cb();
}

function watcher(cb) {
  watch("./**/*.php", reload);
  watch("./views/*.twig", reload);
  watch(["./src/**/*.css"], css);
  cb();
}

function reload(cb) {
  browserSync.reload();
  cb();
}

function serve(cb) {
  browserSync.init({
    proxy: hostname.vhost,
    open: false,
  });
  cb();
}

exports.default = series(serve, watcher);
