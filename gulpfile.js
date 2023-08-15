var gulp = require("gulp");
var sass = require('gulp-sass')(require('node-sass'))
var browserSync = require('browser-sync')

var reload      = browserSync.reload;

const PATH = '/opt/lampp/htdocs/wordpress/wp-content/themes/flatsome-child/'

const scssConfig = {
   dat: PATH + "assets/scss/dat.scss",
   to: PATH + "assets/css",

   fravia: PATH + "assets/scss/fravia.scss",
   ant: PATH + "my-assets/scss/ant.scss",

   self_from: "./scss/dat.scss",
   self_to: "./css",

   my_from: PATH + "my-assets/scss/phuongthao.scss",
   my_to: PATH + "my-assets/css",
}

function scss() {
   return gulp.src(scssConfig.dat)
     .pipe(sass())
     .pipe(gulp.dest(scssConfig.to))
     .pipe(browserSync.stream())
}

function my_scss() {
   return gulp.src(scssConfig.self_from)
     .pipe(sass())
     .pipe(gulp.dest(scssConfig.self_to))
     .pipe(browserSync.stream())
}


function watch() {
   browserSync.init({
      proxy: 'http://localhost/wordpress',
      server: {
         baseDir: "./"
      },
      open: false,
      ui: {
         port: 8001, 
      }
   })
   
   gulp.watch(scssConfig.dat, scss)
   // gulp.watch('index.js').on('change', reload);
}

function watch_self() {
   browserSync.init({
      server: {
         baseDir: "./"
      },
      open: false
   })
   
   gulp.watch(scssConfig.self_from, my_scss)
   gulp.watch('index.js').on('change', reload);
}


exports.scss = scss;
exports.my_scss = my_scss;
exports.watch = watch;
exports.watch_self = watch_self;
