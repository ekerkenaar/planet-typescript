import greetable = require('./greetable');

export class Earth extends greetable.AbstractGreetable {
	greet() {
		return 'Greetings from Earth';
	}
}
