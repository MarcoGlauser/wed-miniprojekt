define(['angular','events/events','events/eventsService', 'guests/showGuests', 'guests/guestsService', 'guests/addGuest', 'events/createEvent', 'components/services/UUIDService', 'angular-resource','angular-route'],
    function (angular, eventsController, eventsService, guestsController, guestService, addGuestController,createEventController,uuidService) {

    var eventManager = angular.module('eventManager', ['ngRoute','ngResource']);

    eventsService.$inject = ['$resource'];
    eventManager.factory('eventsService',eventsService);

    eventManager.factory('uuidService',uuidService);

    eventsController.$inject=['$scope','eventsService'];
    eventManager.controller('eventsController',eventsController);

    createEventController.$inject=['$scope','eventsService','uuidService'];
    eventManager.controller('createEventController',createEventController);

    // guests related stuff
    guestService.$inject = ['$resource'];
    eventManager.factory('guestService', guestService);

    guestsController.$inject=['$scope','guestService', '$routeParams'];
    eventManager.controller('guestsController',guestsController);

    addGuestController.$inject=['$scope','guestService', '$routeParams'];
    eventManager.controller('addGuestController',addGuestController);

    eventManager.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'events/events.html',
                controller: 'eventsController'
            })
            .when('/events/create', {
                templateUrl: 'events/createEvent.html',
                controller: 'createEventController'
            })
            .when('/events/:eventId', {
                templateUrl: 'guests/showGuests.html',
                controller: 'guestsController'
            })
            .when('/events/:eventId/guests', {
                templateUrl: 'guests/showGuests.html',
                controller: 'guestsController'
            })
            .when('/events/:eventId/addGuest', {
                templateUrl: 'guests/addGuest.html',
                controller: 'addGuestController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

    return eventManager;
});

