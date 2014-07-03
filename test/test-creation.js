/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

var mockPromptData = {
  isDeployable: true,
  user:         'foo',
  hostname:     'bar',
  path:         'baz'
};

describe('tiddlywiki generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('tiddlywiki:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.gitignore',
      'package.json',
      'gulpfile.js',
      'src/tiddlywiki.info',
      'dist/tiddlywiki.info'
    ];

    helpers.mockPrompt(this.app, mockPromptData);
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('handles deployable option', function (done) {
    helpers.mockPrompt(this.app, mockPromptData);
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile('package.json', /scp/);
      helpers.assertFile('gulpfile.js', /scp/);
      helpers.assertFile('gulpfile.js', /user.*foo/);
      helpers.assertFile('gulpfile.js', /host.*bar/);
      helpers.assertFile('gulpfile.js', /path.*baz/);
      done();
    });
  });

  it('handles no deployable option', function (done) {
    helpers.mockPrompt(this.app, {isDeployable: false});
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile('package.json', /(?!scp)/);
      helpers.assertFile('gulpfile.js', /(?!scp)/);
      done();
    });
  });
});
