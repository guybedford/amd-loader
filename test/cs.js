define(['loader'], function(loader) {
  if (loader)
    return loader('coffee', function(name, source, req, callback, errback) {
      require(['coffee-script'], function(CoffeeScript) {
        callback(CoffeeScript.compile(source));
      });
    });
  else
    return { pluginBuilder: './cs-builder' };
});
