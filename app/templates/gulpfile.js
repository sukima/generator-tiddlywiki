var gulp       = require('gulp');
var gutil      = require('gulp-util');
var tiddlyWiki = require('tiddlywiki').TiddlyWiki;

var editions = {
  dev:  './server',
  dist: './src'
};

var distOutput = 'index.html';

function runTiddlyWiki() {
  var $tw = tiddlyWiki();
  $tw.boot.argv = Array.prototype.slice.call(arguments, 0);
  $tw.boot.boot();
}

gulp.task('dist', function() {
  runTiddlyWiki(editions.dist, '--rendertiddler', '$:/core/save/all', distOutput, 'text/plain');
});

gulp.task('server', function() {
  runTiddlyWiki(editions.dev, '--server');
});
