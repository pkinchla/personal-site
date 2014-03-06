    module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
 
        cssmin: {
                options: {
                
                },
                build: {
                        src: 'src/style.css',
                        dest: '../style.css'
                }
        },            
        concat: {
                options: {
                
                separator: ';',
                
                },
                dist:  {
                        src: 'src/js/*',
                        dest: 'src/built.js'
        },
        uglify: {
                options: {

                },
                build: {
                        src: 'src/built.js',
                        dest: '../js/built.js'
                }
        }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-cssmin');  
  grunt.loadNpmTasks('grunt-contrib-concat'); 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  
  // Default task.
  grunt.registerTask('default', ['cssmin', 'concat', 'uglify' ]);

};