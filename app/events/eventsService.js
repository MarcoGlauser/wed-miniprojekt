define([], function () {
    function eventsService($resource){
        var Event;
        Event = $resource('http://127.0.0.1:8080/api/events/:id', { id: '@id' }, {
            update: {
                method: 'put'
            },
            query: {
                method : 'get',
                isArray : true,
                transformResponse : function (data) {return angular.fromJson(data).events}
            }
        });

        var service = {
            list: function () { return Event.query().$promise},
            detail: function(id) {return Event.get({id:id}).$promise},
            create: function(event){return Event.save({event:event}).$promise}
        };

        return service
    }

    return eventsService
});