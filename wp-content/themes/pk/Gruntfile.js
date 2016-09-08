module.exports = function(grunt){

grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),

// Task configuration.

  // Development task for watching templates and assets with live reload
  sass: {
    dist: {
      files: {
        'style.built.css' : 'static/css/style.scss'
      }     
    }
  },

  watch: {
    all: {
      files: ['*.php', 'views/*.twig', '../phpFlickr-3.1/*.php', 'static/js/*.js', 'static/js/*.js'],
      options: {
      livereload: true,  // Set livereload to trigger a reload upon change
      }
    },
    
    css: {
    files: ['static/css/*.scss'],
    tasks: ['sass']
    },
    
    options: {
      livereload: true, // Set livereload to trigger a reload upon change
    }
  },

  // production
  cssmin: {
    compress: {
      files: {
        'style.built.css': [ 'style.built.css' ]
      }
    }
  },   


  concat: {
    js: {
      src: ['static/js/*'],
      dest: 'js/built.js',
      options: {
      separator: ';',
      }
    }
  },

  uglify: {
    dist: {
      files: {
        'js/built.min.js': 'static/built.js',
        'js/typekit.js': 'js/typekit.js',
        'js/enhance.js': 'js/enhance.js'
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
  
  
  // Default task.
  grunt.registerTask('default', ['watch']);
  
  // Production task for concatenation and minification
  grunt.registerTask('deploy', ['cssmin', 'concat', 'uglify' ]);

};