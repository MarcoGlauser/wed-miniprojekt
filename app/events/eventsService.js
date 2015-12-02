define([], function () {
    function eventsService($resource){
        var Event;
        Event = $resource('http://127.0.0.1:8080/api/events/:id', { id: '@_id' }, {
            update: {
                method: 'PUT'
            }
        });

        var service = {
            eventList: Event.query().$promise,
            eventDetail: Event.get({id:id}).$promise
        }

        return Event
    }

    return eventsService
});