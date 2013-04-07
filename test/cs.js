define(['amd-loader', 'module', 'require'], function(amdLoader, module, require) {
  pluginBuilder = './cs-builder';
  return amdLoader(module.id, 'coffee', function(name, source, req, callback, errback) {
    require(['./coffee-script'], function(CoffeeScript) {
      callback(CoffeeScript.compile(source));
    });
  });
});
