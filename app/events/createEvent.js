define([], function () {
    function createEventController($scope, eventsService) {
        $scope.event = {};

        $scope.eventCreated = false;

        $scope.createEvent = function () {
            console.log($scope.event)
            eventsService.create($scope.event)
                .then(function(data) {
                    console.log('Success: ' + data);
                }, function(reason) {
                    console.log('Failed: ' + reason);
                }, function(update) {
                    console.log('Got notification: ' + update);
                });
            $scope.eventCreated = true;
        }
    }

    return createEventController
});