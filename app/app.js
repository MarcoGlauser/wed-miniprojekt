define(['angular','events/events','events/eventsService', 'guests/showGuests', 'guests/guestsService', 'guests/addGuest', 'angular-resource','angular-route'],
    function (angular, eventsController, eventsService, guestsController, guestService, addGuestController) {

    var eventManager = angular.module('eventManager', ['ngRoute','ngResource']);

    eventsService.$inject = ['$resource'];
    eventManager.factory('eventsService',eventsService);

    eventsController.$inject=['$scope','eventsService'];
    eventManager.controller('eventsController',eventsController);

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

