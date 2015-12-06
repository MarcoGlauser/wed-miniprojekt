define([], function () {
    function eventDetailController($scope, eventsService, $routeParams) {
        eventsService.detail($routeParams.eventId).then(function(event){
            $scope.event = event
        })
    }

    return eventDetailController
});