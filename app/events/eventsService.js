require(['angular'], function (Angular) {
    Angular.module('eventManager.services').factory('Event', function($resource) {
        return $resource('http://127.0.0.1:8080/api/events/:id', { id: '@_id' }, {
            update: {
                method: 'PUT'
            }
        });
    });
});