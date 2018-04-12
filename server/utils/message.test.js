const chai = require('chai');
const expect = chai.expect;
const { generateMessage, generateLocation } = require('./message');

describe('generateMessage', () => {
	it('should produce correct object', () => {
		const text = 'abc';
		const from = 'def';
		const message = generateMessage(from, text);
		expect(message.text).to.equal(text);
		expect(message.from).to.equal(from);
		expect(message.createdAt).to.be.a('number');
	});
});

describe('generateLocation', () => {
	it('should produce correct object', () => {
		const from = 'abc';
		const latitude = 123;
		const longitude = 456;
		const location = generateLocation(from, latitude, longitude);
		expect(location.from).to.equal(from);
		expect(location.latitude).to.equal(latitude);
		expect(location.longitude).to.equal(longitude);
		expect(location.createdAt).to.be.a('number');
	});
});
