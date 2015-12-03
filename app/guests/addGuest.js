define([], function () {
    function addGuestController($scope, guestsService, $routeParams) {
        $scope.eventId = $routeParams.eventId;

        $scope.inputName = "";
        $scope.inputGift = "";
        $scope.inputComment = "";

        $scope.addedGuest = false;

        $scope.addGuestToEvent = function () {
            guestsService.addGuestToEvent($scope.eventId, {
                name: $scope.inputName,
                gift: $scope.inputGift,
                comment: $scope.inputComment
            });
            $scope.addedGuest = true;
        }
    }

    return addGuestController
});
