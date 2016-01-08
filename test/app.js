'use strict';
var _ = require('lodash');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

var PROMPT_VALUES = {
  name:        'test-name',
  description: 'test-description',
  authorName:  'test-author-name',
  authorEmail: 'test-author-email',
  authorUrl:   'test-author-url'
};

var HELPER_PATH = path.join(__dirname, '../generators/app');

describe('generator-tiddlywiki:app', function () {
  describe('no deploy', function () {
    describe('with babel', function () {
      before(function (done) {
        helpers.run(HELPER_PATH)
          .withPrompts(_.assign({}, PROMPT_VALUES, {
            babel:        true,
            deployChoice: 'no deploy'
          }))
          .on('end', done);
      });

      it('creates files', function () {
        assert.file([
          'README.md', '.babelrc', '.jshintrc', '.gitignore', '.nvmrc', '.vimrc',
          'package.json', 'gulpfile.js', 'config/includes.json',
          'config/libraries.json', 'config/tiddlywiki.info', 'tiddlers/.gitkeep',
          'themes/.gitkeep', 'plugins/babel-polyfill/plugin.info',
          'plugins/babel-polyfill/plugin.js',
          'plugins/babel-polyfill/files/tiddlywiki.files'
        ]);
      });

      it('does not include a deploy command', function () {
        assert.noFileContent('package.json', new RegExp('"deploy":'));
      });

      it('produces valid JSON output', function () {
        /* eslint new-cap: [2, {"capIsNewExceptions": ["assert.JSONFileContent"]}] */
        assert.JSONFileContent('package.json', {description: PROMPT_VALUES.description});
        assert.JSONFileContent('config/tiddlywiki.info', {description: PROMPT_VALUES.description});
        assert.JSONFileContent('config/libraries.json', {});
      });
    });

    describe('without babel', function () {
      before(function (done) {
        helpers.run(HELPER_PATH)
          .withPrompts(_.assign({}, PROMPT_VALUES, {
            babel:        false,
            deployChoice: 'no deploy'
          }))
          .on('end', done);
      });

      it('does not include babel support files', function () {
        assert.noFile([
          '.babelrc', 'plugins/babel-polyfill/plugin.info',
          'plugins/babel-polyfill/plugin.js',
          'plugins/babel-polyfill/files/tiddlywiki.files'
        ]);
        assert.noFileContent('package.json', /babel/);
        assert.noFileContent('gulpfile.js', /babel/);
        assert.noFileContent('config/libraries.json', /babel/);
      });
    });
  });

  describe('deploy rsync', function () {
    before(function (done) {
      helpers.run(HELPER_PATH)
        .withPrompts(_.assign({}, PROMPT_VALUES, {
          babel:        false,
          deployChoice: 'rsync',
          deployUri:    'foobar@example.com:path/to/output'
        }))
        .on('end', done);
    });

    it('includes rsync deply command', function () {
      assert.fileContent('package.json', new RegExp('rsync.*foobar@example.com:path/to/output'));
    });
  });

  describe('deploy scp', function () {
    before(function (done) {
      helpers.run(HELPER_PATH)
        .withPrompts(_.assign({}, PROMPT_VALUES, {
          babel:        false,
          deployChoice: 'scp',
          deployUri:    'foobar@example.com:path/to/output'
        }))
        .on('end', done);
    });

    it('includes scp deply command', function () {
      assert.fileContent('package.json', new RegExp('scp.*foobar@example.com:path/to/output'));
    });
  });
});
