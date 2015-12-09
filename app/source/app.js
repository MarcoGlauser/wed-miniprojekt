define(
    [
        'angular',
        'classes/events/eventsController',
        'classes/events/eventsService',
        'classes/guests/showGuests',
        'classes/guests/guestsService',
        'classes/guests/addGuest',
        'classes/events/createEvent',
        'classes/events/eventDetail',
        'classes/components/services/UUIDService',
        'angular-resource',
        'angular-route'
    ],
    function (
        angular,
        eventsController,
        eventsService,
        guestsController,
        guestService,
        addGuestController,
        createEventController,
        eventDetailController,
        uuidService
    ) {

        console.log("create module");
        var eventManager = angular.module('eventManager', ['ngRoute','ngResource']);

        console.log("inject events related classes");
        eventsService.$inject = ['$resource'];
        eventManager.factory('eventsService',eventsService);

        eventManager.factory('uuidService',uuidService);

        eventsController.$inject=['$scope','eventsService'];
        eventManager.controller('eventsController',eventsController);

        createEventController.$inject=['$scope','eventsService','uuidService'];
        eventManager.controller('createEventController',createEventController);

        eventDetailController.$inject=['$scope','eventsService','$routeParams'];
        eventManager.controller('eventDetailController',eventDetailController);

        // guests related stuff
        console.log("inject guests related classes");
        guestService.$inject = ['$resource'];
        eventManager.factory('guestService', guestService);

        guestsController.$inject=['$scope','guestService','eventsService', '$routeParams'];
        eventManager.controller('guestsController',guestsController);

        addGuestController.$inject=['$scope','guestService', '$routeParams', '$location'];
        eventManager.controller('addGuestController',addGuestController);

        console.log("configure route provider");
        eventManager.config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'classes/events/events.html',
                    controller: 'eventsController'
                })
                .when('/events/create', {
                    templateUrl: 'classes/events/createEvent.html',
                    controller: 'createEventController'
                })
                .when('/events/:eventId', {
                    templateUrl: 'classes/events/eventDetail.html',
                    controller: 'eventDetailController'
                })
                .when('/events/:eventId/guests', {
                    templateUrl: 'classes/guests/showGuests.html',
                    controller: 'guestsController'
                })
                .when('/events/:eventId/addGuest', {
                    templateUrl: 'classes/guests/addGuest.html',
                    controller: 'addGuestController'
                })
                .when('/events/:eventId/guest/:guestId/edit', {
                    templateUrl: 'classes/guests/addGuest.html',
                    controller: 'addGuestController'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);
        return eventManager;
});

