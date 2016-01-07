# generator-tiddlywiki [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A TiddlyWiki generator for Yeoman

This is a generator for creating a new [TiddlyWiki][] from npm. It will establish a base directory structure and dependencies. Use it to manage a development server (locally) and to compile a fresh TiddlyWiki (stand-alone HTML). It uses [Gulp][] as the build system with the following tasks:

- `npm start`      - Serve the TiddlyWiki as a web app (http://127.0.0.1:8080/) with built in autosaving.
- `npm run build`  - Compile a stand alown HTML file from the stored tiddlers.
- `npm run deploy` - This will copy the generated file to your server via SSH. (This feature is only available if you choose the _deploy_ option as part of running the Yeoman script.)
- `npm run clean`  - Clean up any left ofer generated files.

[TiddlyWiki]: http://tiddlywiki.com/
[Gulp]: http://gulpjs.com/

## Installation

First, install [Yeoman](http://yeoman.io) and generator-tiddlywiki using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-tiddlywiki
```

Then generate your new project:

```bash
yo tiddlywiki
```

## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

[Do What You Want to Public License (WYWTPL v3)](http://tritarget.org/wywtpl/COPYING)


[npm-image]: https://badge.fury.io/js/generator-tiddlywiki.svg
[npm-url]: https://npmjs.org/package/generator-tiddlywiki
[travis-image]: https://travis-ci.org/sukima/generator-tiddlywiki.svg?branch=master
[travis-url]: https://travis-ci.org/sukima/generator-tiddlywiki
[daviddm-image]: https://david-dm.org/sukima/generator-tiddlywiki.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/sukima/generator-tiddlywiki
