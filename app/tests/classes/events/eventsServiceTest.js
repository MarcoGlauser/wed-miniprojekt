define(
    [
        'libraries/angularMocks',
        'app'
    ],
    function (angularMocks, app) {

        'use strict';
        describe('EventsServiceTest', function () {

            var httpBackend, eventsService;

            beforeEach(function () {
                console.log("inject mocked httpbackend");
                angularMocks.module('eventManager');
                angularMocks.inject(function ($httpBackend, _eventsService_) {
                    httpBackend = $httpBackend;
                    eventsService = _eventsService_;
                });

                expect(eventsService).toBeDefined();
            });

            afterEach(function () {
                console.log("Check if any pending requests");

                //These two calls will make sure that at the end of the test, all expected http calls were made
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });

            it('should find guests for event', function () {
                console.log("mock REST server");
                httpBackend.expectGET('http://127.0.0.1:8080/api/events').respond(200, JSON.stringify(
                    {
                        events: [
                            createHsrPartyAsEvent(1)
                        ]
                    }
                ));

                console.log("do actual request");
                eventsService.list().then(function (foundEvents) {
                    expect(foundEvents.length).toBe(1);
                    expect(foundEvents[0].name).toBe("HSR-Party");
                });

                // Because we're mocking an async action, ngMock provides a method for us to explicitly flush the request
                httpBackend.flush();
            });

            it('should detail event', function () {
                var eventId = 1;
                console.log("mock REST server");
                httpBackend.expectGET('http://127.0.0.1:8080/api/events/1').respond(200, JSON.stringify(
                    createHsrPartyAsEvent(1)
                ));

                console.log("do actual request");
                eventsService.detail(eventId).then(function (foundEvent) {
                    expect(foundEvent.name).toBe("HSR-Party");
                });

                // Because we're mocking an async action, ngMock provides a method for us to explicitly flush the request
                httpBackend.flush();
            });

            it('should create event', function () {
                console.log("mock REST server");
                httpBackend.expectPOST('http://127.0.0.1:8080/api/events?id=3').respond(200, JSON.stringify(
                    createHsrPartyAsEvent(3)
                ));

                console.log("do actual request");
                eventsService.create(createHsrPartyAsEvent(3)).then(function (foundEvent) {
                    expect(foundEvent.name).toBe("HSR-Party");
                });

                // create: function(event){return Event.save(event).$promise},
                // Because we're mocking an async action, ngMock provides a method for us to explicitly flush the request
                httpBackend.flush();

            });

            it('should delete event', function () {
                console.log("mock REST server");
                httpBackend.expectGET('http://127.0.0.1:8080/api/events/3').respond(200, JSON.stringify(
                    createHsrPartyAsEvent(3)
                ));

                console.log("do actual request");
                eventsService.delete(3).then(function (foundEvent) {
                    expect(foundEvent.name).toBe("HSR-Party");
                });

                // create: function(event){return Event.save(event).$promise},
                // Because we're mocking an async action, ngMock provides a method for us to explicitly flush the request
                httpBackend.flush();
            });

            function createHsrPartyAsEvent(id) {
                return {
                    id: id,
                    name: "HSR-Party",
                    description: "Party an der HSR",
                    targetGroup: "Studenten",
                    contributionsDescription: "Kuchen",
                    maxAmountOfGuests: null,
                    location: {
                        name: "HSR",
                        street: "Oberseestrasse",
                        plz: 8640,
                        city: "Rapperswil"
                    }
                    ,
                    times: {
                        begin: "2015-11-15T19:00:00.000Z",
                        end: "2011-11-16T03:00:00.000Z"
                    }
                    ,
                    guests: []
                };
            }
        });
    });
