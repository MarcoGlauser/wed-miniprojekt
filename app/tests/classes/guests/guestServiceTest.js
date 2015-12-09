define(
    [
        'libraries/angularMocks',
        'app'
    ],
    function (angularMocks, app) {

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

                expect(guestService).toBeDefined();
            });

            afterEach(function () {
                console.log("Check if any pending requests");

                //These two calls will make sure that at the end of the test, all expected http calls were made
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });


            it('should find guests for event', function () {
                var eventId = 1;

                console.log("mock REST server");
                httpBackend.expectGET('http://127.0.0.1:8080/api/events/1/guests').respond(200, JSON.stringify(
                    {
                        guests: [
                            createNewBondAsGuest(1),
                            createEinsteinAsGuest(2),
                            createSupermanAsGuest(3)
                        ]
                    }
                ));

                console.log("do actual request");
                guestService.findGuestsForEvent(eventId).then(function (foundGuests) {
                    expect(foundGuests.length).toBe(3);
                    var onlyNames = extractsNamesOnly(foundGuests);

                    expect(onlyNames).toContain('James Bond');
                    expect(onlyNames).toContain('Albert Einstein');
                    expect(onlyNames).toContain('Superman');
                });

                // Because we're mocking an async action, ngMock provides a method for us to explicitly flush the request
                httpBackend.flush();
            });

            it('should add new guest to event', function () {
                var eventId = 1;

                var guestToAd = {
                    name: 'James Bond',
                    contribution: 'Entertainment',
                    comment: 'Bond, James Bond'
                };

                console.log("mock REST server");
                httpBackend.expectPOST('http://127.0.0.1:8080/api/events/1/guests').respond(200, JSON.stringify(
                    guestToAd
                ));

                guestService.addGuestToEvent(eventId, guestToAd);
                httpBackend.flush();
            });

            it('should find guest by id', function () {
                var eventId = 1;
                var guestId = 2;

                var returnedGuest = createNewBondAsGuest(guestId);

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

            it('should sign out guest', function () {
                var guestId = 2;

                console.log("mock REST server");
                httpBackend.expectPOST('http://127.0.0.1:8080/api/events/2/guests').respond(200);

                console.log("do actual request");
                guestService.signOutGuest(guestId);

                httpBackend.flush();
            });

            it('should save updated guest', function () {
                var eventId = 1;
                var guestId = 2;

                console.log("mock REST server");
                httpBackend.expectPOST('http://127.0.0.1:8080/api/events/1/guests').respond(200);

                console.log("do actual request");
                guestService.saveUpdatedGuest(eventId, guestId);

                httpBackend.flush();
            });

            function createNewBondAsGuest(guestId) {
                return {
                    id: guestId,
                    name: 'James Bond',
                    contribution: 'Entertainment',
                    comment: 'Bond, James Bond'
                };
            }

            function createEinsteinAsGuest(guestId) {
                return {
                    id: guestId,
                    name: 'Albert Einstein',
                    contribution: 'Theory of relativity',
                    comment: 'Only two things are infinite, the universe and human stupidity, and I am not sure about the former.'
                };
            }

            function createSupermanAsGuest(guestId) {
                return {
                    id: guestId,
                    name: 'Superman',
                    contribution: 'Strength',
                    comment: 'Yeah!'
                };
            }

            function extractsNamesOnly(foundGuests) {
                return foundGuests.map(function (a) {
                    return a.name
                });
            }
        });
    });
