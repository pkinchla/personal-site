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
            files: ['../*.php', '../inc/*.php', '../phpFlickr-3.1/*.php', '../js/*.js', '../images/*.{png,jpg,jpeg,gif,webp,svg}'],
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
        cssmin: {
                options: {
                },
                build: {
                        src:  '../style.css',
                        dest: '../style.css'
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
                js: {
                        src: 'src/built.js',
                        dest:'../js/built.min.js'
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