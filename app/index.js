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
  //var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  // var prompts = [{
  //   type: 'confirm',
  //   name: 'someOption',
  //   message: 'Would you like to enable this option?',
  //   default: true
  // }];

  // this.prompt(prompts, function (props) {
  //   this.someOption = props.someOption;

  //   cb();
  // }.bind(this));
};

TiddlywikiGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('src/tiddlers');
  this.mkdir('server');
  fs.symlinkSync('../src/tiddlers', 'server/tiddlers');

  this.copy('_package.json', 'package.json');
  this.copy('_gitignore', '.gitignore');
  this.copy('gulpfile.js', 'gulpfile.js');
  this.copy('src/tiddlywiki.info', 'src/tiddlywiki.info');
  this.copy('server/tiddlywiki.info', 'server/tiddlywiki.info');
};
