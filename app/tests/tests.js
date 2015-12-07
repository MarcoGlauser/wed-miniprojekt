require.config({
    baseUrl: './',
    paths: {
        'frameworks/angular': '../bower_components/angular/angular.min',
        'app': '../source/classes/',
        'tests': 'classes',
        'libraries/jasmine': ['../bower_components/jasmine/lib/jasmine-core/jasmine'],
        'libraries/jasmine-html': ['../bower_components/jasmine/lib/jasmine-core/jasmine-html'],
        'libraries/jasmine-boot': ['../bower_components/jasmine/lib/jasmine-core/boot']
    },
    shim: {
        'frameworks/angular': {
            exports: ['angular']
        },
        'libraries/jasmine-html': {
            deps : ['libraries/jasmine']
        },
        'libraries/jasmine-boot': {
            deps : ['libraries/jasmine', 'libraries/jasmine-html']
        }
    }
});


require(['libraries/jasmine-boot'], function () {
    require(['tests/components/service/UUIDServiceTest'], function(){
        //trigger Jasmine
        window.onload();
    })
});

