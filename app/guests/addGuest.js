define([], function () {
    function addGuestController($scope, guestsService, $routeParams, $location) {
        $scope.eventId = $routeParams.eventId;
        $scope.guestId = $routeParams.guestId;

        $scope.isSaveMode = false;
        $scope.inputName = "";
        $scope.inputGift = "";
        $scope.inputComment = "";

        if ($scope.guestId) {
            $scope.isSaveMode = true;
            guestsService.findGuestById($scope.eventId, $scope.guestId).then(function(foundGuest){
                $scope.inputName = foundGuest.name;
                $scope.inputGift = foundGuest.gift;
                $scope.inputComment = foundGuest.comment;
            });
        }

        $scope.addedGuest = false;

        $scope.addGuestToEvent = function () {
            guestsService.addGuestToEvent($scope.eventId, {
                name: $scope.inputName,
                gift: $scope.inputGift,
                comment: $scope.inputComment
            });
            $scope.addedGuest = true;
        };

        $scope.saveGuest = function () {
            guestsService.saveUpdatedGuest($scope.eventId, {
                id: $scope.guestId,
                name: $scope.inputName,
                gift: $scope.inputGift,
                comment: $scope.inputComment
            }).then(function(){
                $location.path('/events/' + $scope.eventId + '/guests');
            });
        };
    }

    return addGuestController
});
