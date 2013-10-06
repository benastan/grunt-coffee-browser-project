var project = require('grunt-coffee-browser-project');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  project.init(grunt, {
    watch: {
      'default': {
        files: [ 'src/**/*.coffee' ],
        tasks: [ 'default' ]
      }
    }
  });
};
