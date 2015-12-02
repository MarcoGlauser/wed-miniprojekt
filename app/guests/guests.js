define([], function () {
    function guestController($scope, guestsService) {

        guestsService.list().then(function (guests) {
            $scope.guests = guests;
        });
    }

    return guestController
});
