require.config({
    // base url relative to the index.html
    baseUrl: './',
    paths: {
        'angular': 'bower_components/angular/angular',
        'angular-resource': 'bower_components/angular-resource/angular-resource'
    },
    // angular does not support async loading out of the box -> use the shim loader
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-resource':{
            exports: 'angular-resource'
        }
    }
});

require(['angular','events/events.js','angular-resource'], function (Angular,events) {
    var EventManager = Angular.module('eventManager', ['ngResource','eventManager.events']);

    Angular.element(document).ready(function () {
        Angular.bootstrap(document, [EventManager.name]);
    });
});

