var path       = require('path');
var gulp       = require('gulp');
var gutil      = require('gulp-util');
var clean      = require('gulp-clean');
var tiddlyWiki = require('tiddlywiki').TiddlyWiki;
<% if (isDeployable) { %>
var scp        = require('scp');
<% } %>

var editions = {
  dev:  './src',
  dist: './dist'
};

var distOutput = 'index.html';

function outputPath(edition) {
  return path.join(edition, 'output', distOutput);
}

function runTiddlyWiki() {
  var $tw = tiddlyWiki();
  $tw.boot.argv = Array.prototype.slice.call(arguments, 0);
  gutil.log('Running command: tiddlywiki ' + $tw.boot.argv.join(' '));
  $tw.boot.boot();
}

gulp.task('dist', function() {
  runTiddlyWiki(editions.dist, '--rendertiddler', '$:/core/save/all', distOutput, 'text/plain');
  gutil.log('Saved to: ' + gutil.colors.blue(outputPath(editions.dist)));
});

gulp.task('server', function() {
  runTiddlyWiki(editions.dev, '--server');
});

gulp.task('clean', function() {
  return gulp.src(outputPath(editions.dist), {read: false})
    .pipe(clean());
});

<% if (isDeployable) { %>
gulp.task('deploy', ['dist'], function(done) {
  var outputFile = outputPath(editions.dist);
  scp.send({
    file: outputFile,
    user: '<%= user %>',
    host: '<%= hostname %>',
    path: '<%= path %>'
  }, function(err, stdout, stderr) {
    if (err) return done(err);
    gutil.log('Deployed ' + gutil.colors.blue(outputFile));
    done();
  });
});
<% } %>
