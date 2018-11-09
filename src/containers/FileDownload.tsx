import { connect, MapStateToProps } from 'react-redux';
import FileDownload from '../components/FileDownload';
import { RootReducerState, getURLByIndex, getFileByIndex, getCounterByIndex, getFormat } from '../store';
import { Renamer } from '../renamer';

interface StateProps {
	file: File,
	name: string;
	url: string;
	counter: number;
}

interface DispatchProps {

}

interface OwnProps {
	index: number;
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, RootReducerState> = (state, { index }) => {
	const format = getFormat(state);
	const file = getFileByIndex(state, index) as File;
	const url = getURLByIndex(state, index) as string;
	const counter = getCounterByIndex(state, index) as number;
	const renamer = new Renamer(file);
	renamer.addRule(['count', () => counter]);
	const name = renamer.format(format);
	return {
		file,
		url,
		counter,
		name,
	};
};

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
)(FileDownload);
