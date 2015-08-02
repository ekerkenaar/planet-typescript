/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />

import chai = require('chai');
import {Venus} from './venus';

let expect = chai.expect;

describe('Venus', () => {
	
	let venus: Venus;
	
	beforeEach(() => {
		venus = new Venus();		
	});
	
	it('should create a Venus', () => {
		expect(venus).to.exist;
	});
	
	it('should NOT return a greeting from Venus', () => {
		expect(() => {venus.greet()}).to.throw();
	});	
});
