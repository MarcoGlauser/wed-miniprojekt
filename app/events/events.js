require(['angular','events/eventsService','angular-route'], function (Angular,Event) {
    Angular.module('eventManager.events',['ngRoute','eventManager.services'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'events.html',
            controller: 'EventsController'
        });
    }])

    .controller('EventsController', function ($scope) {
        console.log('asdf')
        $scope.events = Event.query()
    });
});
