# generator-tiddlywiki

A generator for [Yeoman](http://yeoman.io).

This is a generator for creating a new [TiddlyWiki][] from npm. It will establish a base directory structure and dependencies. Use it to manage a development server (locally) and to compile a fresh TiddlyWiki (stand-alone HTML). It uses [Gulp][] as the build system with the following tasks:

- `gulp server` - Serve the TiddlyWiki as a web app (http://127.0.0.1:8080/) with built in autosaving.
- `gulp dist`   - Compile a stand alown HTML file from the stored tiddlers.
- `gulp deploy` - This will copy the generated file to your server via SSH. (This feature is only available if you choose the _deploy_ option as part of running the Yeoman script.)
- `gulp clean`  - Clean up any left ofer generated files.

[TiddlyWiki]: http://tiddlywiki.com/
[Gulp]: http://gulpjs.com/

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-tiddlywiki from npm, run:

```
$ npm install -g generator-tiddlywiki
```

Finally, initiate the generator:

```
$ yo tiddlywiki
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[WYWTPL](http://tritarget.org/wywtpl/COPYING)
