/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />

import chai = require('chai');
import SolarSystem = require('./index');

let expect = chai.expect;

describe('SolarSystem', () => {
	it('should contain Earth',() => {
		expect(SolarSystem.Earth).to.exist;
	});
});
