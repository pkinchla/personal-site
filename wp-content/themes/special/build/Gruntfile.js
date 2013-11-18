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
        uglify: {
                options: {

                },
                build: {
                        src: 'src/scripts.js',
                        dest: '../js/scripts.js',
                }
        } 
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-cssmin');  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-devtools');
  
  // Default task.
  grunt.registerTask('default', ['cssmin', 'uglify']);

};