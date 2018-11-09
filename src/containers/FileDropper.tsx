import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import { addFile } from '../store/actions';

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
		const { files } = dataTransfer;
		if (!files || !files.length) {
			return;
		}
		for (const file of Array.from(files)) {
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				const url = URL.createObjectURL(file);
				this.props.addFile(file, url);
			});
			reader.readAsArrayBuffer(file);
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(FileDropper);
