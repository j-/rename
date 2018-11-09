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

it('can format multiple vars', () => {
	const actual = formatter.format('Hello %world foo%foo');
	expect(actual).toBe('Hello WORLD foobar');
});

it('can format complex var', () => {
	const actual = formatter.format('Hello %worlds');
	expect(actual).toBe('Hello WORLD$');
});

it('can add new rules', () => {
	formatter.addRule('forecast', () => 'sunny');
	formatter.addRule('temperature', () => 21);
	const actual = formatter.format('Today is %forecast and %temperature degrees C');
	expect(actual).toBe('Today is sunny and 21 degrees C');
});
