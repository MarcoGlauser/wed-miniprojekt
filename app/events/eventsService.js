require(['angular','angular-resource'], function (Event) {
    angular.module('events.services', []).factory('Event', function($resource) {
        return $resource('http://127.0.0.1:8080/api/events/:id', { id: '@_id' }, {
            update: {
                method: 'PUT'
            }
        });
    });
});