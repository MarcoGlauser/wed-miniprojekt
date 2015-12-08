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
                transformResponse : function (data) {
                    var events = angular.fromJson(data).events;
                    events.forEach(function (event) {
                        annotateNotCancelledGuests(event)
                    });
                    return events
                }
            },
            save:{
                method:'POST',
                url:'http://127.0.0.1:8080/api/events'
            },
            get:{
                transformResponse : function (event) {
                    var event = angular.fromJson(event)
                    annotateNotCancelledGuests(event)
                    return event
                }
            }
        });

        var service = {
            list: function () { return Event.query().$promise},
            detail: function(id) {return Event.get({id:id}).$promise},
            create: function(event){return Event.save(event).$promise},
            delete: function(id) {return Event.get({id:id}).$promise},
        };

        function annotateNotCancelledGuests(event) {
            event.notCancelledGuests = event.guests.filter(function (guest) {
                return !guest.canceled
            });
            event.signupOpen = function(){
                return this.maximalAmoutOfGuests == undefined || this.notCancelledGuests.length < this.maximalAmoutOfGuests;
            };
        }

        return service
    }



    return eventsService
});