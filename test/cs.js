define(['amdcompiler', 'module'], function(amdcompiler, module) {
  pluginBuilder = './cs-builder';
  return amdcompiler(module.id, 'coffee', function(name, source, req, callback, errback) {
    require(['coffee-script'], function(CoffeeScript) {
      callback(CoffeeScript.compile(source));
    });
  });
});
