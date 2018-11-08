import { Formatter } from './formatter';

let formatter: Formatter;

beforeEach(() => {
	formatter = new Formatter([
		['foo', () => 'bar'],
		['world', () => 'WORLD'],
		['worlds', () => 'WORLD$'],
	]);
});

it('returns normal strings as-is', () => {
	const actual = formatter.format('Hello world');
	expect(actual).toBe('Hello world');
});

it('can escape % as %%', () => {
	const actual = formatter.format('Hello %%world');
	expect(actual).toBe('Hello %%world');
});

it('can format simple var', () => {
	const actual = formatter.format('Hello %world');
	expect(actual).toBe('Hello WORLD');
});

xit('can format complex var', () => {
	const actual = formatter.format('Hello %worlds');
	expect(actual).toBe('Hello WORLD$');
});
