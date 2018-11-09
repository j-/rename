import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import { addFile } from '../store/actions';
import { FileSystemEntry, FileSystemDirectoryEntry, FileSystemFileEntry } from '../file-system';

interface StateProps {

}

interface DispatchProps {
	addFile: (file: File, url: string) => void;
}

interface OwnProps {

}

interface Props extends StateProps, DispatchProps, OwnProps {

}

const mapStateToProps = null;

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
	addFile,
};

/** TODO: Clean up this implementation. */
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
		if (!files || !files.length) {
			return;
		}
		const { addFile } = this.props;
		// Handle files attached to the data transfer object
		for (const file of Array.from(files)) {
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				const url = URL.createObjectURL(file);
				addFile(file, url);
			});
			reader.readAsArrayBuffer(file);
		}
		// Get file system entries when dropping directories
		for (const item of Array.from(items)) {
			if (typeof item.webkitGetAsEntry !== 'function') {
				continue;
			}
			const entry = item.webkitGetAsEntry() as FileSystemEntry;
			if (entry.isDirectory) {
				const reader = (entry as FileSystemDirectoryEntry).createReader();
				reader.readEntries((results) => {
					for (const result of results) {
						if (!result.isFile) {
							continue;
						}
						(result as FileSystemFileEntry).file((file) => {
							const reader = new FileReader();
							reader.addEventListener('load', () => {
								const url = URL.createObjectURL(file);
								addFile(file, url);
							});
							reader.readAsArrayBuffer(file);
						});
					}
				});
			}
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(FileDropper);
