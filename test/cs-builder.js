define(['amdcompiler', 'coffee-script', 'module'], function(amdcompiler, CoffeeScript, module) {
  return amdcompiler(module.id, 'coffee', function(name, source, req, load, config) {
    load(CoffeeScript.compile(source));
  });
});
