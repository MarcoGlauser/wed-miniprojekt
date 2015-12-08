define([], function () {
    function createEventController($scope, eventsService, UUIDService) {
        $scope.event = {
            id: null,
            name: null,
            description: null,
            targetGroup: null,
            contributions: null,
            location: {
                name: null,
                street: null,
                plz: null,
                city: null
            },
            times: {
                begin: null,
                end: null
            },
            maximalAmountOfGuests: null,
            guests: []
        };

        $scope.eventCreated = false;

        $scope.createEvent = function () {
            console.log($scope.event)
            eventsService.create($scope.event)
                .then(
                    function(data) {
                        $scope.eventCreated = true;
                    },
                    function(reason) {
                        console.log('Failed: ' + reason);
                    }
                )

        }
    }

    return createEventController
});