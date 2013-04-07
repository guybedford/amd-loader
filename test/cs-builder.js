define(['amd-loader', 'coffee-script', 'module'], function(amdLoader, CoffeeScript, module) {
  return amdLoader(module.id, 'coffee', function(name, source, req, load, config) {
    load(CoffeeScript.compile(source));
  });
});
