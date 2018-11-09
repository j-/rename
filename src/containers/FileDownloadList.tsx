import { connect, MapStateToProps } from 'react-redux';
import { RootReducerState, getFileCount } from '../store';
import FileDownloadList from '../components/FileDownloadList';

interface StateProps {
	count: number;
}

interface OwnProps {

}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, RootReducerState> = (state) => ({
	count: getFileCount(state),
});

export default connect(
	mapStateToProps,
)(FileDownloadList);
