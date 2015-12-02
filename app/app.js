define(['angular','events/events','events/eventsService', 'guests/guests', 'guests/guestsService', 'angular-resource','angular-route'],
    function (angular, eventsController, eventsService, guestsController, guestService) {

    var eventManager = angular.module('eventManager', ['ngRoute','ngResource']);

    eventsService.$inject = ['$resource'];
    eventManager.factory('eventsService',eventsService);

    eventsController.$inject=['$scope','eventsService'];
    eventManager.controller('eventsController',eventsController);

    // guests related stuff
    guestService.$inject = ['$resource'];
    eventManager.factory('guestService', guestService);

    guestsController.$inject=['$scope','guestService'];
    eventManager.controller('guestsController',guestsController);

    eventManager.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'events/events.html',
                controller: 'eventsController'
            })
            .when('/guests', {
                templateUrl: 'guests/guests.html',
                controller: 'guestsController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

    return eventManager;
});

