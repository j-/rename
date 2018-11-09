import * as React from 'react';
import { setDownloadURL } from '../download';

export interface Props {
	file: File,
	name: string;
	url: string;
	counter: number;
}

export default class FileDownload extends React.Component<Props> {
	render () {
		const { url, name } = this.props;
		return (
			<a
				href={url}
				download={name}
				draggable={true}
				onDragStart={this.handleDragstart}
			>
				{name}
			</a>
		);
	}

	private handleDragstart = (e: React.DragEvent<HTMLAnchorElement>) => {
		const { dataTransfer } = e;
		const { file, url, name } = this.props;
		const { type } = file;
		setDownloadURL(dataTransfer, {
			file, url, name, type,
		});
	}
}
