export interface Greetable {
	greet(): string
}

export class AbstractGreetable {
	greet(): string {
		throw new Error('Not implemented');
	}
}
