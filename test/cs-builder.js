define(['loader', 'coffee-script'], function(loader, CoffeeScript) {
  return loader('coffee', function(name, source, req, load, config) {
    load(CoffeeScript.compile(source));
  });
});
