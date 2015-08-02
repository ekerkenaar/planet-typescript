/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />

import chai = require('chai');
import {Earth} from './earth';

let expect = chai.expect;

describe('Earth', () => {
	
	let earth: Earth;
	
	beforeEach(() => {
		earth = new Earth();		
	});
	
	it('should create an Earth', () => {
		expect(earth).to.exist;
	});
	
	it('should return a greeting from Earth', () => {
		expect(earth.greet()).to.equal('Greetings from Earth');
	});	
});
