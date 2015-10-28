require.config({
    // base url relative to the index.html
    baseUrl: './',
    paths: {
        'angular': 'bower_components/angular/angular',
        'app': 'components'

    },
    // angular does not support async loading out of the box -> use the shim loader
    shim: {
        'angular': {
            exports: 'angular'
        }
    }
});

require(['angular','app/modules/eventManager/eventManager'], function (Angular,EventManger) {
    Angular.element(document).ready(function () {
        Angular.bootstrap(document, [EventManger.name]);
    });
});