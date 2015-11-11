require(['angular','angular-resource', 'events/eventsService'], function (Event) {
    angular.module('events', ['ngResource']).controller('EventsController', function ($scope) {
        $scope.events = Event.query()
    });
});
