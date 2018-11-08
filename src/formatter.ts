export type FormatterPattern = string;

export interface FormatterHandler {
	(): string;
}

export interface FormatterRule extends Array<FormatterPattern | FormatterHandler> {
	length: 2;
	0: FormatterPattern;
	1: FormatterHandler;
}

export class Formatter {
	private rules: FormatterRule[] = [];

	constructor (rules?: FormatterRule[]) {
		if (rules) {
			for (const rule of rules) {
				this.addRule(rule[0], rule[1]);
			}
		}
	}

	public addRule (pattern: FormatterPattern, handler: FormatterHandler) {
		this.rules.push([pattern, handler]);
	}

	public getRule (partialPattern: string) {
		return this.rules.find(([pattern]) => pattern === partialPattern);
	}

	public getPossibleRules (partialPattern: string) {
		return this.rules.filter(([pattern]) => pattern.startsWith(partialPattern));
	}

	public format (format: string) {
		let cursor = 0;
		let result = '';
		while (cursor < format.length) {
			if (format[cursor] === '%') {
				if (format[cursor + 1] === '%') {
					result += '%%';
					cursor += 2;
					continue;
				}
				let current = '';
				cursor++;
				while (cursor < format.length) {
					current += format[cursor];
					const rule = this.getRule(current);
					if (rule) {
						result += rule[1]();
						current = '';
						cursor++;
						break;
					}
					cursor++;
				}
				result += current;
			} else {
				result += format[cursor];
			}
			cursor++;
		}
		return result;
	}
}
