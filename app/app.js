define(['angular','events/events','events/eventsService','angular-resource','angular-route'], function (angular,eventsController,eventsService) {
    var eventManager = angular.module('eventManager', ['ngRoute','ngResource']);

    eventsService.$inject = ['$resource'];
    eventManager.factory('eventsService',eventsService);

    eventsController.$inject=['$scope','eventsService'];
    eventManager.controller('eventsController',eventsController);

    eventManager.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'events/events.html',
                controller: 'eventsController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

    return eventManager;
});

