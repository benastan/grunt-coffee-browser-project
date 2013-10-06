var project = module.exports = {},
    fs = require('fs'),
    path = require('path');

project.init = function(grunt, options) {
  var environments, packageJSON;

  packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

  grunt.loadNpmTasks('./grunt-coffee-browser-project/node_modules/grunt-contrib-coffee');
  grunt.loadNpmTasks('./grunt-coffee-browser-project/node_modules/grunt-contrib-uglify');
  grunt.loadNpmTasks('./grunt-coffee-browser-project/node_modules/grunt-browserify');

  if (typeof options === 'undefined') options = {};

  projectOptions = options.coffeeBrowserProject;
  delete options.coffeeBrowserProject;
  if (typeof projectOptions === 'undefined') projectOptions = {};

  if (options.name) projectOptions.name = options.name;
  delete options.name;
  if (! projectOptions.name) projectOptions.name = packageJSON.name;

  if (! projectOptions.directories) projectOptions.directories = {};
  if (! projectOptions.environments) environments = { 'default': projectOptions };
  if (! options.coffee) options.coffee = {};
  if (! options.browserify) options.browserify = {};
  if (! options.uglify) options.uglify = {};

  if (! projectOptions.directories.build) projectOptions.directories.build = path.dirname(packageJSON.main);
  if (! projectOptions.directories.source) projectOptions.directories.source = 'src';
  if (! projectOptions.directories.distribution) projectOptions.directories.distribution = 'dist';

  projectOptions.basename = path.basename(packageJSON.main, '.js');

  for (var environmentName in environments) {
    addTasksForEnvironment.call(options, grunt, environmentName, environments[environmentName], projectOptions);
  }

  grunt.initConfig(options);
};

function addTasksForEnvironment(grunt, environmentName, environmentOptions, projectOptions) {
  var sourceDirectory, distributionDirectory, buildDirectory;

  sourceDirectory = projectOptions.directories.source;
  distributionDirectory = projectOptions.directories.distribution;
  buildDirectory = projectOptions.directories.build;

  for (var key in projectOptions) {
    if (typeof environmentOptions[key] === 'undefined') {
      environmentOptions[key] = projectOptions[key];
    }
  }

  this.coffee[environmentName] = {
    expand: true,
    flatten: false,
    cwd: sourceDirectory,
    src: [ '*.coffee', '*/**.coffee' ],
    dest: distributionDirectory,
    ext: '.js'
  };

  this.browserify[environmentName] = {
    src: [ distributionDirectory+'/'+projectOptions.basename+'.js' ],
    dest: buildDirectory+'/'+projectOptions.basename+'.js'
  };

  this.uglify[environmentName] = {
    src: [ buildDirectory+'/'+projectOptions.basename+'.js' ],
    dest: buildDirectory+'/'+projectOptions.basename+'.min.js'
  };

  grunt.registerTask(
    environmentName,
    [
      'coffee:'+environmentName,
      'browserify:'+environmentName,
      'uglify:'+environmentName
    ]
  );
}
