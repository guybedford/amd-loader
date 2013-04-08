AMD Loader
==

A RequireJS plugin helper module.

Useful for creating loader plugins for:
* Templates (eg Handlebars, Mustache)
* Compilers (eg CoffeeScript, ES6 conversion)

Supports:
* Cross-browser XHR for dynamic loading
* Resource builds in different server environments
* Cross-origin dynamic loading with CORS
* Precompiled resources with the `optimizeAllPluginResources: true` r.js build option.

This module is in planning to be used as a base for the [Require-CS module](https://github.com/jrburke/require-cs).

Plugins Built with AMD-Loader
---

* [ES6 plugin](https://github.com/guybedford/es6)
* [CommonJS plugin](https://github.com/guybedford/cjs)

Example Usage
---

Suppose I want to make a template plugin called "awesometpl". I want to allow users to do:

```javascript
  define(['awesometpl!some-template-file'], function(compiledTemplate) {
    document.body.innerHTML = compiledTemplate({ tpl: 'var' });
  });
```

And have it automatically load `some-template-file.awesomeext` and compile it for us, including build support.

Manually creating this plugin can be a lot of work.

AMD Loader can make it for us in just a few lines:

awesometpl.js:
```javascript
  define(['amd-loader', 'awesome-compiler'], function(amdLoader, awesomeCompiler) {
    return amdLoader('awesometpl', 'awesomeext', function(name, source, req, callback, errback, config) {
      callback(awesomeCompiler.compile(source));
    });
  });
```

Fine-grained build support (optional)
--- 

When used in production, one still has to manually stub the plugin to exclude from the build, as well as the compiler. This also stops dynamic loads working in production.

These configurations can be avoided entirely, and dynamic loads can still work in production, by using a `pluginBuilder` form of the loader helper.

For the template example above, we can then do the following:

awesometpl.js:
```javascript
  define(['amd-loader'], function(amdLoader) {
    var pluginBuilder = './awesometpl-build';
    return amdLoader('awesometpl', 'awesomeext', function(name, source, req, callback, errback, config) {
      require(['awesome-compiler'], function(awesomeCompiler) {
        callback(awesomeCompiler.compile(source));
      });
    });
  });
```

awesometpl-build.js:
```javascript
  define(['amd-loader', 'awesome-compiler'], function(amdLoader, awesomeCompiler) {
    return amdLoader('awesometpl', 'awesomeext', function(name, source, req, callback, errback, config) {
      callback(awesomeCompiler.compile(source));
    });
  });
```

Now builds with the plugin will work without needing any configuration. `awesome-compiler` is excluded from the build by default (pending issue https://github.com/jrburke/r.js/issues/289), 
and we don't need to provide any stub configuration to exclude the plugin from the build. 

Because the `awesome-compiler` is only loaded when the first dynamic call is made, it isn't included in production by default,
but can still be loaded in if necessary.

License
---

MIT
