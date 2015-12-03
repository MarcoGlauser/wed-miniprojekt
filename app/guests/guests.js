define([], function () {
    function guestController($scope, guestsService, $routeParams) {
        $scope.eventId = $routeParams.eventId;

        guestsService.findGuestsForEvent($scope.eventId).then(function (guests) {
            $scope.guests = guests;
        });
    }

    return guestController
});
