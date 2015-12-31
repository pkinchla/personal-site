module.exports = function(grunt){

grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),

// Task configuration.

  // Development task for watching templates and assets with live reload
  sass: {
    dist: {
      files: {
        '../style.css' : 'src/css/style.scss'
      }     
    }
  },

  watch: {
    all: {
      files: ['../*.php', '../inc/*.php', '../phpFlickr-3.1/*.php', 'src/js/*.js', '../images/*.{png,jpg,jpeg,gif,webp,svg}'],
      options: {
      livereload: true,  // Set livereload to trigger a reload upon change
      }
    },
    
    css: {
    files: ['src/css/*.scss'],
    tasks: ['sass']
    },
    
    options: {
      livereload: true, // Set livereload to trigger a reload upon change
    }
  },

  // production
  criticalcss: {
    custom: {
      options: {
        url: 'http://dev.paulkinchla.com/about/',
        width: 1366,
        height:768,
        outputfile: '../critical.css',
        filename: '../style.css'
      }
    }
  },

  cssmin: {
    compress: {
      files: {
        '../style.css': [ '../style.css' ],
        '../critical.css': [ '../critical.css' ]
      }
    }
  },   


  concat: {
    js: {
      src: ['src/js/*'],
      dest: 'src/built.js',
      options: {
      separator: ';',
      }
    }
  },

  uglify: {
    dist: {
      files: {
        '../js/built.min.js': 'src/built.js',
        '../js/loadCSS.js': 'src/head-js/loadCSS.js',
        '../js/typekit.js': '../js/typekit.js'
      }
    }
  },
});

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat'); 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-criticalcss');
  
  
  // Default task.
  grunt.registerTask('default', ['watch']);
  
  // Production task for concatenation and minification
  grunt.registerTask('deploy', ['criticalcss', 'cssmin', 'concat', 'uglify' ]);

};