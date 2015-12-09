require.config({
    baseUrl: './../source/',
    paths: {
        'angular': '../bower_components/angular/angular',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'angular-route': '../bower_components/angular-route/angular-route',
        'frameworks/angular': '../bower_components/angular/angular.min',
        'libraries/angularMocks': '../bower_components/angular-mocks/angular-mocks',
        'libraries/jasmine': ['../bower_components/jasmine/lib/jasmine-core/jasmine'],
        'libraries/jasmine-html': ['../bower_components/jasmine/lib/jasmine-core/jasmine-html'],
        'libraries/jasmine-boot': ['../bower_components/jasmine/lib/jasmine-core/boot'],

        'testFolder': '../tests'
    },
    shim: {
        'libraries/angularMocks': {
            deps: ['frameworks/angular'],
            exports: 'angular.mock'
        },
        'libraries/jasmine-html': {
            deps : ['libraries/jasmine']
        },
        'libraries/jasmine-boot': {
            deps : ['libraries/jasmine', 'libraries/jasmine-html']
        },
        'angular': {
            exports: 'angular'
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        }
    }
});


require(['libraries/jasmine-boot'], function () {
    require([
        'testFolder/classes/components/service/UUIDServiceTest',
        'testFolder/classes/guests/guestServiceTest',
        'testFolder/classes/events/eventsServiceTest',
        'testFolder/classes/events/eventsControllerTest',
    ],function(){
        //trigger Jasmine
        window.onload();
    })
});

