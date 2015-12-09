define([], function () {
    function eventsController($scope,eventsService){
        console.log('Init eventsController');
        eventsService.list().then(function (events){
            console.log('Got some events: ' + events.length);
            $scope.events = events;
        })
    }

    return eventsController
});
