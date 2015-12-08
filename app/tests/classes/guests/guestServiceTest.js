define([ 'libraries/angularMocks', 'app/guests/guestsService'], function (angularMocks, guestsService) {
    'use strict';

    describe('GuestServiceTest', function () {

        var  $httpBackend;

        beforeEach(angularMocks.inject(function($injector){
            $httpBackend = $injector.get('$httpBackend');
        }));

        afterEach(inject(function($httpBackend){
            //These two calls will make sure that at the end of the test, all expected http calls were made
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        }));


        it('should find guest by id', angularMocks.inject(function($httpBackend) {
            var eventId = 1;
            var guestId = 2;

            var returnedGuest = {
                id : guestId,
                name: 'James Bond',
                contribution: 'Entertainment',
                comment: 'Bond, James Bond'
            };

            //Create an expectation for the correct url, and respond with a mock object
            $httpBackend.expectGET('/projects/abcde.json').respond(200, JSON.stringify(returnedGuest));

            guestsService.findGuestById(eventId, guestId).then(function(foundGuests){
                //Now the resource should behave as expected
                expect(foundGuests.name).toBe('James Bond');
            });

            //Because we're mocking an async action, ngMock provides a method for us to explicitly flush the request
            $httpBackend.flush();
        }));

    });
});
