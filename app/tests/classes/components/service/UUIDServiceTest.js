define(['app/components/services/UUIDService'], function (uuidService) {
    'use strict';

    describe('UUIDServceTest', function () {

        it('should generate different uuid each time', function () {
            var first = uuidService().getRandomUuid();
            var second = uuidService().getRandomUuid();
            expect(first).not.toBe(second);
        });
    });
});