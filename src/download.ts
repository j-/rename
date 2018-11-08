export interface GenerateDownloadURLArgs {
	file?: File,
	url: string;
	type: string;
	name: string;
}

export interface GenerateDownloadURL {
	(args: GenerateDownloadURLArgs): string;
}

export const generateDownloadURL: GenerateDownloadURL = ({
	url,
	file,
	type = file && file.type,
	name = file && file.name,
}) => {
	return `${type}:${name}:${url}`;
};

export const setDownloadURL = (dataTransfer: DataTransfer, args: GenerateDownloadURLArgs) => {
	const downloadURL = generateDownloadURL(args);
	dataTransfer.setData('DownloadURL', downloadURL);
	dataTransfer.setData('text/plain', args.name);
};
