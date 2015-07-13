/*jshint node:true */
'use strict';
var fs     = require('fs');
var util   = require('util');
var path   = require('path');
var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var yosay  = require('yosay');

var OUTPUT_PATH = 'wiki-dist/output/*';

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the peachy ' + chalk.red('TiddlyWiki') + ' generator!'
    ));

    var isDeployable = function(props) {
      return props.deployChoice !== 'no deploy';
    };

    var prompts = [{
      type:    'list',
      name:    'deployChoice',
      message: 'How will you deploy this?',
      choices: ['no deploy', 'rsync', 'scp']
    },{
      type:    'input',
      name:    'deployUri',
      message: 'Deploy URI (user@hostname.com:path/to/output)',
      when:    isDeployable
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      switch(props.deployChoice) {
        case 'rsync':
          this.props.deployCommand =
            util.format('rsync -av %s %s', OUTPUT_PATH, props.deployUri);
          break;
        case 'scp':
          this.props.deployCommand =
            util.format('scp -r %s %s', OUTPUT_PATH, props.deployUri);
          break;
        default:
          this.props.deployCommand = null;
      }

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('tiddlers/.gitkeep'),
        this.destinationPath('tiddlers/.gitkeep')
      );
      this.fs.copy(
        this.templatePath('wiki/tiddlywiki.info'),
        this.destinationPath('wiki/tiddlywiki.info')
      );
      this.fs.copy(
        this.templatePath('wiki-dist/tiddlywiki.info'),
        this.destinationPath('wiki-dist/tiddlywiki.info')
      );
      this.fs.copyTpl(
        this.templatePath('package.json.ejs'),
        this.destinationPath('package.json'),
        this.props
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
