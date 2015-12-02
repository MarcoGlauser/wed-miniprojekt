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
            deps: ['angular']
        },
        'angular-route':{
            deps: ['angular']
        }
    }
});

require(['angular', 'app'], function (angular,EventManager) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, [EventManager.name]);
    });
});