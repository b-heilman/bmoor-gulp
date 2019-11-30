

const {expect} = require('chai');

describe('this is a test', function(){
	describe('this is only a test', function(){
		it('should work successfully', function(){
			expect(1+1).to.equal(2);
		});

		it('should fail', function(){
			expect(1+1).to.equal(3);
		});
	});
});
