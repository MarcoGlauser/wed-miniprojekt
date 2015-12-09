define(
    [
        'libraries/angularMocks',
        'classes/guests/guestsService',
        'app'
    ],
    function (angularMocks,
              GuestsService,
              app) {

        'use strict';
        describe('GuestServiceTest', function () {

            var httpBackend, guestService;

            beforeEach(function () {
                console.log("inject mocked httpbackend");
                angularMocks.module('eventManager');
                angularMocks.inject(function ($httpBackend, _guestService_) {
                    httpBackend = $httpBackend;
                    guestService = _guestService_;
                });
            });
            /*
             beforeEach(angularMocks.inject(function ($injector, $guestService) {
             console.log("Mock backend");

             $httpBackend = $injector.get('$httpBackend');

             // var $resource = $injector.get('$resource');
             // guestsService = new GuestsService($injector.get('$resource'));

             // console.log("Print guestService: ");
             // console.log(guestsService);
             // expect(guestsService).toBeDefined();
             }));
             /*
             */
            afterEach(function () {
                console.log("Check if any pending requests");

                //These two calls will make sure that at the end of the test, all expected http calls were made
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });

            it('should find guest by id', function () {
                expect(guestService).toBeDefined();

                var eventId = 1;
                var guestId = 2;

                var returnedGuest = {
                    id: guestId,
                    name: 'James Bond',
                    contribution: 'Entertainment',
                    comment: 'Bond, James Bond'
                };

                console.log("mock REST server");
                httpBackend.expectGET('http://127.0.0.1:8080/api/events/1/guests/2').respond(200, JSON.stringify(returnedGuest));

                console.log("do actual request");
                guestService.findGuestById(eventId, guestId).then(function (foundGuests) {
                    console.log("found guest is: " + foundGuests.name);
                    expect(foundGuests.name).toBe('James Bond');
                });

                // Because we're mocking an async action, ngMock provides a method for us to explicitly flush the request
                httpBackend.flush();
            });

        });
    });
