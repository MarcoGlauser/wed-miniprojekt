define([], function () {
    function guestController($scope, guestsService, eventsService,$routeParams) {
        $scope.eventId = $routeParams.eventId;
        $scope.guests = [];

        updateGuests();
        updateEvent();

        $scope.signOut = function(guestId){
            guestsService.signOutGuest($scope.eventId, guestId).then(function(){
                updateGuests();
                updateEvent();
            });
        };

        function updateGuests() {
            guestsService.findGuestsForEvent($scope.eventId).then(function (guests) {
                $scope.guests = guests;

            });
        }
        function updateEvent() {
            eventsService.detail($routeParams.eventId).then(function(event){
                $scope.signupOpen = event.signupOpen()
            })
        }
    }
    return guestController
});
