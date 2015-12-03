define([], function () {
    function guestService($resource){
        var Guest;
        Guest = $resource('http://127.0.0.1:8080/api/events/:eventId/guests/:guestId',
            {
                eventId: '@eventId',
                guetsId: '@guestId'
            }, {
            update: {
                method: 'put'
            },
            query: {
                method : 'get',
                isArray : true,
                transformResponse : function (data) {
                    return angular.fromJson(data).guests;
                }
            }
        });

        var service = {
            findGuestsForEvent: function (givenEventId) {
                return Guest.query({eventId: givenEventId}).$promise;
            },
            detail: function(id) {
                return Guest.get({id:id}).$promise;
            }
        };

        return service
    }

    return guestService;
});