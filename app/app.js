require.config({
  // base url relative to the index.html
  baseUrl: './',
  paths: {
    'angular': 'bower_components/angular/angular'
  },
  // angular does not support async loading out of the box -> use the shim loader
  shim: {
    'angular': {
      exports: 'angular'
    }
  }
});

require(['angular'], function (Angular) {
  var app = Angular.module("lafete");
  Angular.element(document).ready(function() {
    Angular.bootstrap(document, [app.name]);
  });
});