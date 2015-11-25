require.config({
    // base url relative to the index.html
    baseUrl: './',
    paths: {
        'angular': 'bower_components/angular/angular',
        'angular-resource': 'bower_components/angular-resource/angular-resource',
        'angular-route': 'bower_components/angular-route/angular-route'
    },
    // angular does not support async loading out of the box -> use the shim loader
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-resource':{
            exports: 'angular-resource'
        },
        'angular-route':{
            exports: 'angular-route'
        }
    }
});

require(['angular','events/events','angular-resource'], function (Angular,events) {
    var EventManager = Angular.module('eventManager', ['ngResource','eventManager.events']);

    Angular.element(document).ready(function () {
        Angular.bootstrap(document, [EventManager.name]);
    });
});

