require.config({
    // base url relative to the index.html
    baseUrl: './',
    paths: {
        'angular': '../bower_components/angular/angular',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'angular-route': '../bower_components/angular-route/angular-route'
    },
    // angular does not support async loading out of the box -> use the shim loader
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-resource':{
            deps: ['angular']
        },
        'angular-route':{
            deps: ['angular']
        }
    }
});

require(['angular', 'app'], function (angular, EventManager) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, [EventManager.name]);
    });
});


/**
 * I really hate require.js - common log something, just something, even for that you need to write
 * javascript.
 */

start = +new Date();
requirejs.onResourceLoad = function(context, map, depArray) {
    var duration = new Date() - start;
    console.log("onResourceLoad", duration + "ms", map.id);
};

requirejs.onError = function (err) {
    console.log(err.requireType);
    console.log('modules: ' + err.requireModules);
    throw err;
};