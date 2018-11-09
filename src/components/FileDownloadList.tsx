import * as React from 'react';
import FileDownload from '../containers/FileDownload';

export interface Props {
	count: number;
}

const FileDownloadList: React.StatelessComponent<Props> = ({ count }) => {
	const children: React.ReactChild[] = [];
	for (let i = 0; i < count; i++) {
		children.push(
			<li className="FileDownloadList-item" key={i}>
				<FileDownload index={i} />
			</li>
		);
	}
	return (
		<ul className="FileDownloadList">
			{children}
		</ul>
	);
};

export default FileDownloadList;
