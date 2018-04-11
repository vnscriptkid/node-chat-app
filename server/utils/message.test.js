const chai = require('chai');
const expect = chai.expect;
const { messageGenerator } = require('./message');

describe('generateMessage', () => {
	it('should produce correct object', () => {
		const text = 'abc';
		const from = 'def';
		const message = messageGenerator(from, text);
		expect(message.text).to.equal(text);
		expect(message.from).to.equal(from);
		expect(message.createdAt).to.be.a('number');
	});
});
