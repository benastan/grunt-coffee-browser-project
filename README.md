Grunt Coffee Browser Project
============================

This is a node module that I use when building browser clients in JavaScript.

Two tools are crucial for my workflow: [Grunt](http://gruntjs.com/) and [Browserify](http://browserify.org/).

Additionally, I use CoffeeScript on almost every project.

This module generates tasks for my workflow.

# Usage

It is 100% painless to set up a browser project.

For starters, you'll need `npm`, `grunt`, `coffeescript`

Simply add the library to your `package.json`:
  
    {
      "name": "your-project",
      ...
      "dependencies": {
        "grunt": "*",
        "grunt-coffee-browser-project": "*"
      }
    }

Run `npm install`, then in your `Gruntfile.js`:
  
    var project = require('grunt-coffee-browser-project');
    
    module.exports = function(grunt) {
      project.init(grunt);
    };

Your default task will now compile your CoffeeScript, browserify the outputted codebase, and create an ugified version of your library.
