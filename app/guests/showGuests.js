define([], function () {
    function guestController($scope, guestsService, $routeParams) {
        $scope.eventId = $routeParams.eventId;

        guestsService.findGuestsForEvent($scope.eventId).then(function (guests) {
            $scope.guests = guests;
        });

        $scope.signOut = function(guestId){
            guestsService.signOutGuest($scope.eventId, guestId);
            $scope.$apply();
        };
    }

    return guestController
});
