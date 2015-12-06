define([], function () {
    function guestController($scope, guestsService, $routeParams) {
        $scope.eventId = $routeParams.eventId;
        $scope.guests = [];

        updateGuests();

        $scope.signOut = function(guestId){
            guestsService.signOutGuest($scope.eventId, guestId).then(function(){
                updateGuests();
            });
        };

        function updateGuests() {
            guestsService.findGuestsForEvent($scope.eventId).then(function (guests) {
                $scope.guests = guests;
            });
        }
    }
    return guestController
});
