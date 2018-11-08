import * as format from 'date-fns/format';

export class Renamer {
	static clean (filename: string) {
		return filename.replace(/[:]/g, '_');
	}

	private file: File;

	constructor (file: File) {
		this.file = file;
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

	public get iso () {
		return format(this.lastModified, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
	}

	public get YYYY () {
		return format(this.lastModified, 'YYYY');
	}

	public get MM () {
		return format(this.lastModified, 'MM');
	}

	public get DD () {
		return format(this.lastModified, 'DD');
	}

	public get HH () {
		return format(this.lastModified, 'HH');
	}

	public get mm () {
		return format(this.lastModified, 'mm');
	}

	public get ss () {
		return format(this.lastModified, 'ss');
	}

	public get SSS () {
		return format(this.lastModified, 'SSS');
	}

	public get Z () {
		return format(this.lastModified, 'Z');
	}

	public get ext () {
		const match = this.name.match(/\.(.*)$/);
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
			format
				.replace(/%YYYY/g, () => this.YYYY)
				.replace(/%MM/g, () => this.MM)
				.replace(/%DD/g, () => this.DD)
				.replace(/%HH/g, () => this.HH)
				.replace(/%mm/g, () => this.mm)
				.replace(/%ss/g, () => this.ss)
				.replace(/%SSS/g, () => this.SSS)
				.replace(/%Z/g, () => this.Z)
				.replace(/%basename/g, () => this.basename)
				.replace(/%ext/g, () => this.ext)
				.replace(/%dotext/g, () => this.dotext)
		);
	}
}
