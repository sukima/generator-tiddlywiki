/*jshint node:true */
'use strict';
var fs     = require('fs');
var util   = require('util');
var path   = require('path');
var yeoman = require('yeoman-generator');


var TiddlywikiGenerator = module.exports = function TiddlywikiGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TiddlywikiGenerator, yeoman.generators.Base);

TiddlywikiGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var isDeployable = function(props) { return props.isDeployable; };

  var prompts = [
    {
      type:    'confirm',
      name:    'isDeployable',
      message: 'Will you be deploying the TiddlyWiki HTML file via SSH?',
      default: true
    },
    {
      type:    'input',
      name:    'user',
      message: 'What is the username you use to log into the SSH Server?',
      default: process.env.USER,
      when:    isDeployable
    },
    {
      type:    'input',
      name:    'hostname',
      message: 'What is the hostname of the SSH Server?',
      when:    isDeployable
    },
    {
      type:    'input',
      name:    'path',
      message: 'What directory will you be saving the generated index.html file on the server?',
      default: '',
      when:    isDeployable
    }
  ];

  this.prompt(prompts, function (props) {
    this.isDeployable = props.isDeployable;
    this.user         = props.user;
    this.hostname     = props.hostname;
    this.path         = props.path;

    cb();
  }.bind(this));
};

TiddlywikiGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('src/tiddlers');
  this.mkdir('dist');
  fs.symlinkSync('../src/tiddlers', 'dist/tiddlers');

  this.template('_package.json', 'package.json');
  this.template('_gulpfile.js', 'gulpfile.js');

  this.copy('gitignore', '.gitignore');
  this.copy('src/tiddlywiki.info', 'src/tiddlywiki.info');
  this.copy('dist/tiddlywiki.info', 'dist/tiddlywiki.info');
};
