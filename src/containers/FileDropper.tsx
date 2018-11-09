import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import { addFile } from '../store/actions';

import {
	FileSystemEntry,
	FileSystemFileEntry,
	FileSystemDirectoryEntry,
	FileSystemDirectoryReader,
} from '../file-system';

interface StateProps {

}

interface DispatchProps {
	addFile: (file: File) => void;
}

interface OwnProps {

}

interface Props extends StateProps, DispatchProps, OwnProps {

}

const mapStateToProps = null;

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
	addFile,
};

class FileDropper extends React.Component<Props> {
	componentDidMount () {
		window.addEventListener('dragover', this.handleDragover);
		window.addEventListener('drop', this.handleDrop);
	}

	componentWillUnmount () {
		window.removeEventListener('dragover', this.handleDragover);
		window.removeEventListener('drop', this.handleDrop);
	}

	render () {
		return null;
	}

	private handleDragover = (e: DragEvent) => {
		e.preventDefault();
	}

	private handleDrop = (e: DragEvent) => {
		e.preventDefault();
		const { dataTransfer } = e;
		if (!dataTransfer) {
			return;
		}
		const { files, items } = dataTransfer;
		this.handleDataTransferFileList(files);
		this.handleDataTransferItemList(items);
	}

	private handleDataTransferFileList = (fileList: FileList) => {
		Array.from(fileList)
			.filter((file) => file.type)
			.map(this.handleFile);
	}

	private handleDataTransferItemList = (itemList: DataTransferItemList) => {
		Array.from(itemList)
			.filter((item: DataTransferItem) => typeof item.webkitGetAsEntry === 'function')
			.map((item: DataTransferItem) => item.webkitGetAsEntry())
			.filter((entry: FileSystemEntry) => entry && entry.isDirectory)
			.map((entry: FileSystemDirectoryEntry) => entry.createReader())
			.forEach((reader: FileSystemDirectoryReader) => {
				reader.readEntries((results: FileSystemEntry[]) => {
					Array.from(results)
						.filter((result: FileSystemEntry) => result.isFile)
						.forEach((entry: FileSystemFileEntry) => entry.file(this.handleFile));
				});
			});
	}

	private handleFile = (file: File) => {
		this.props.addFile(file);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(FileDropper);
