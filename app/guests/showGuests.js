define([], function () {
    function guestController($scope, guestsService, eventsService,$routeParams) {
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

        eventsService.detail($routeParams.eventId).then(function(event){
            $scope.event = event
        })
    }
    return guestController
});
