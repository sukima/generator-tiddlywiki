'use strict';
var _ = require('lodash');
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var OUTPUT_PATH = 'wiki/output/*';

function File(src) {
  this.srcPath = src;
  var parts = path.parse(src);
  this.isTemplate = (parts.ext === '.ejs');
  if (this.isTemplate) {
    parts.base = parts.base.replace(parts.ext, '');
    parts.ext = '';
  }
  parts.name = parts.name.replace(/^_/, '.');
  parts.base = parts.base.replace(/^_/, '.');
  this.destPath = path.format(parts);
}
File.prototype.process = function (ctx) {
  var templatePath = ctx.templatePath(this.srcPath);
  var destinationPath = ctx.destinationPath(this.destPath);
  if (this.isTemplate) {
    ctx.fs.copyTpl(templatePath, destinationPath, ctx.props);
  } else {
    ctx.fs.copy(templatePath, destinationPath);
  }
};

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(util.format(
      'Welcome to the prime %s generator!', chalk.red('generator-tiddlywiki')
    )));

    function isDeployable(props) {
      return props.deployChoice !== 'no deploy';
    }

    var prompts = [{
      name:     'name',
      message:  'Wiki Name',
      default:  path.basename(process.cwd()),
      filter:   _.kebabCase,
      validate: function (str) {
        return str.length > 0;
      }
    }, {
      name:    'description',
      message: 'Description'
    }, {
      name:    'authorName',
      message: 'Author\'s Name',
      default: this.user.git.name(),
      store:   true
    }, {
      name:    'authorEmail',
      message: 'Author\'s Email',
      default: this.user.git.email(),
      store:   true
    }, {
      name:    'authorUrl',
      message: 'Author\'s Homepage',
      store:   true
    }, {
      name:    'babel',
      type:    'confirm',
      message: 'Use es2015 (precompiled with Babel)'
    }, {
      type:    'list',
      name:    'deployChoice',
      message: 'How will you deploy this?',
      choices: ['no deploy', 'rsync', 'scp']
    }, {
      type:    'input',
      name:    'deployUri',
      message: 'Deploy URI (user@hostname.com:path/to/output)',
      when:    isDeployable
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      switch (props.deployChoice) {
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

  configurating: function () {
    var files = [
      'README.md.ejs', '_jshintrc', '_gitignore', '_nvmrc', '_vimrc',
      'tiddlers/_gitkeep', 'plugins/_gitkeep', 'themes/_gitkeep'
    ];
    if (this.props.babel) {
      files.push('_babelrc');
    }
    files.forEach(function (src) {
      new File(src).process(this);
    }, this);
  },

  writing: function () {
    var files = [
      'package.json.ejs', 'gulpfile.js.ejs', 'config/includes.json',
      'config/libraries.json.ejs', 'config/tiddlywiki.info.ejs'
    ];
    if (this.props.babel) {
      files.push(
        'plugins/babel-polyfill/plugin.info',
        'plugins/babel-polyfill/plugin.js.ejs',
        'plugins/babel-polyfill/files/tiddlywiki.files'
      );
    }
    files.forEach(function (src) {
      new File(src).process(this);
    }, this);
  },

  install: function () {
    this.installDependencies();
  }
});
