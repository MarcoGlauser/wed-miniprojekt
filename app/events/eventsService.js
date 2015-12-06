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
            },
            save:{
                method:'POST',
                url:'http://127.0.0.1:8080/api/events'
            }
        });

        var service = {
            list: function () { return Event.query().$promise},
            detail: function(id) {return Event.get({id:id}).$promise},
            create: function(event){return Event.save(event).$promise},
            delete: function(id) {return Event.get({id:id}).$promise},
        };

        return service
    }

    return eventsService
});