define([], function () {
    function guestService($resource){
        var Guest;
        Guest = $resource('http://127.0.0.1:8080/api/events/:eventId/guests/:guestId',
            {
                eventId: '@eventId',
                guestId: '@guestId'
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
                return Guest.query(
                    {eventId: givenEventId}
                ).$promise;
            },
            addGuestToEvent: function (givenEventId, guestToAdd) {
                return Guest.save(
                    {eventId: givenEventId},
                    guestToAdd
                );
            },
            signOutGuest: function (givenEventId, givenGuestId) {
                return Guest.save(
                    {eventId: givenEventId, guestId: givenGuestId},
                    {canceled: true}
                ).$promise;
            },
            saveUpdatedGuest: function (givenEventId, updatedGuest) {
                return Guest.save(
                    {eventId: givenEventId, guestId: updatedGuest.id},
                    updatedGuest
                ).$promise;
            },
            findGuestById: function(givenEventId, givenGuestId) {
                return Guest.get({
                    eventId: givenEventId,
                    guestId: givenGuestId
                }).$promise;
            }
        };

        return service
    }

    return guestService;
});