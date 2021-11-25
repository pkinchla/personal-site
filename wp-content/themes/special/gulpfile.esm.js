import { src, dest, watch, series } from "gulp";
const browserSync = require("browser-sync").create();
import rollup from "gulp-rollup";
import hostname from "./vhost.js";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssImport from "postcss-import";
import { terser } from "rollup-plugin-terser";

function css(cb) {
  var plugins = [postcssImport(), autoprefixer(), cssnano()];
  src("./src/css/main.css")
    .pipe(postcss(plugins))
    .pipe(dest("./dist/css/"))
    .pipe(browserSync.stream());
  cb();
}

function typeFaces(cb) {
  src("./src/typesfaces/*.woff2")
    .pipe(dest("./dist/typefaces/"))
    .pipe(browserSync.stream());
  cb();
}

function js(cb) {
  src("./src/js/**/*.js")
    .pipe(
      rollup({
        input: "./src/js/main.js",
        output: {
          format: "esm",
        },
        plugins: [terser()],
      })
    )
    .pipe(dest("./dist/js/"))
    .pipe(browserSync.stream());
  cb();
}

function watcher(cb) {
  watch("./**/*.php", reload);
  watch("./views/*.twig", reload);
  watch("./src/**/*.css", css);
  watch("./src/**/*.js", js);
  watch("./src/**/*.css", typeFaces);
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

export default series(serve, watcher);
