define([], function () {
    function eventsController($scope,eventsService){
        console.log('asdf')
        $scope.events = eventsService.query()
    }

    return eventsController
});
