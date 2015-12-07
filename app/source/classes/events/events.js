define([], function () {
    function eventsController($scope,eventsService){
        eventsService.list().then(function (events){
            $scope.events = events;
        })
    }

    return eventsController
});
