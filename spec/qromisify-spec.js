'use strict';

var promisify = self.qromisify;

describe('promisify', function() {

	describe('when supplied with undefined', function() {

		it('should complete successfully without throwing an error', function() {
			//arrange
			var target = {};

			//act
			var result = promisify(target);

			//assert
			expect(result === target).toBe(true);
		});

	});

});