define([], function () {
    function eventsController($scope,eventsService){
        eventsService.list().then(function (events){
            $scope.events = events;
            console.log(events)
        })
    }

    return eventsController
});
