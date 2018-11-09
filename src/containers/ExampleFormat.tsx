import { connect, MapStateToProps } from 'react-redux';
import ExampleFormat from '../components/ExampleFormat';
import { RootReducerState, getFormat } from '../store';

interface StateProps {
	format: string;
}

interface OwnProps {

}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, RootReducerState> = (state) => ({
	format: getFormat(state),
});

export default connect(
	mapStateToProps,
)(ExampleFormat);
