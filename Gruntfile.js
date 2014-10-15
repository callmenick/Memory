module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: {
          'js/classList.min.js': ['js/classList.js'],
          'js/memory.min.js': ['js/memory.js']
        }
      }
    },
    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*.css', '!*.min.css'],
          dest: 'css/',
          ext: '.min.css'
        }]
      }
    },
    watch: {
      'jsfiles': {
        files: ['js/classList.js', 'js/memory.js'],
        tasks: ['uglify']
      },
      'cssfiles': {
        files: ['css/memory.css'],
        tasks: ['cssmin']
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      prod: {
        tasks: ["watch:jsfiles", "watch:cssfiles"]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.registerTask('default', ['uglify', 'cssmin']);
  grunt.registerTask('prod', ['concurrent:prod']);
}