define(
    [
        'libraries/angularMocks',
        'app'
    ],
    function (angularMocks, app) {

        'use strict';
        describe('EventControllerTest', function () {

            var eventsController, myScope, httpBackend;

            beforeEach(function () {
                angularMocks.module('eventManager');

                angularMocks.inject(function ($controller, $rootScope, $httpBackend, _eventsService_, $q) {
                    httpBackend = $httpBackend;
                    myScope = $rootScope.$new();

                    // fake result
                    spyOn(_eventsService_, "list").and.callFake(function () {
                        var deferred = $q.defer();
                        deferred.resolve([createHsrPartyAsEvent(1)]);
                        console.log('returning fake result');
                        return deferred.promise;
                    });

                    // setup new contorller with our scope
                    eventsController = $controller('eventsController', {
                        '$scope': myScope,
                        eventsService: _eventsService_
                    });
                });
                expect(eventsController).toBeDefined();
            });

            it('should have correct scope', function () {
                // so that scope magically refreshes its - what a wonderful name for that function
                myScope.$digest();
                expect(myScope.events.length).toBe(1);
                expect(myScope.events[0].name).toBe('HSR-Party');
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
