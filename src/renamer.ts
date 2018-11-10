import * as format from 'date-fns/format';
import { Formatter, FormatterRule } from './formatter';

export const getInvalidCharacterExpression = () => (
	/[\u0000-\u001f\u0022\u002a\u002f\u003a\u003c\u003e\u003f\u005c\u007c]/g
);

export class Renamer {
	/**
	 * 1. The forbidden printable ASCII characters are:
	 *
	 *    * Linux/Unix:
	 *
	 *      - `/` (forward slash)
	 *
	 *    * Windows:
	 *
	 *      - `<` (less than)
	 *      - `>` (greater than)
	 *      - `:` (colon - sometimes works, but is actually NTFS Alternate Data Streams)
	 *      - `"` (double quote)
	 *      - `/` (forward slash)
	 *      - `\` (backslash)
	 *      - `|` (vertical bar or pipe)
	 *      - `?` (question mark)
	 *      - `*` (asterisk)
	 *
	 * 2. Non-printable characters:
	 *
	 *    * Linux/Unix:
	 *
	 *      - 0 (NULL byte)
	 *
	 *    * Windows:
	 *
	 *      - 0-31 (ASCII control characters)
	 *
	 * @see https://stackoverflow.com/a/31976060
	 */
	static clean (filename: string) {
		return filename.replace(getInvalidCharacterExpression(), '_');
	}

	private file: File;
	private formatter: Formatter;

	constructor (file: File) {
		this.file = file;
		this.formatter = new Formatter([
			['name',        () => this.name],
			['basename',    () => this.basename],
			['YYYY',        () => format(this.lastModified, 'YYYY')],
			['MM',          () => format(this.lastModified, 'MM')],
			['DD',          () => format(this.lastModified, 'DD')],
			['HH',          () => format(this.lastModified, 'HH')],
			['mm',          () => format(this.lastModified, 'mm')],
			['ss',          () => format(this.lastModified, 'ss')],
			['SSS',         () => format(this.lastModified, 'SSS')],
			['Z',           () => format(this.lastModified, 'Z')],
			['A',           () => format(this.lastModified, 'A')],
			['a',           () => format(this.lastModified, 'a')],
			['ext',         () => this.ext],
			['dotext',      () => this.dotext],
			['unix',        () => this.lastModified],
			['type',        () => this.type],
			// TODO: Implement image dimensions detection
			['width',       () => 0],
			['height',      () => 0],
			// TODO: Implement file size detection
			['size',        () => 0],
		]);
	}

	public addRule ([pattern, handler]: FormatterRule) {
		this.formatter.addRule(pattern, handler);
	}

	public get name () {
		return this.file.name;
	}

	public get lastModified () {
		return this.file.lastModified;
	}

	public get type () {
		return this.file.type;
	}

	public get ext () {
		const match = this.name.match(/\.([^.]*)$/);
		return match ? match[1] : '';
	}

	public get dotext () {
		const { ext } = this;
		return ext ? '.' + ext : '';
	}

	public get basename () {
		return this.getBasename(this.ext);
	}

	public getBasename (ext?: string) {
		const name = this.name;
		if (ext && name.endsWith(ext)) {
			return name.substring(0, name.length - ext.length - 1);
		} else {
			return name;
		}
	}

	public format (format: string) {
		return Renamer.clean(
			this.formatter.format(format)
		);
	}
}
