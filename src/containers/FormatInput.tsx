import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import Input, { Props as P } from '../components/Input';
import { RootReducerState, getFormat } from '../store';
import { setFormat } from '../store/actions';

const mapStateToProps: MapStateToProps<P, P, RootReducerState> = (state) => ({
	value: getFormat(state),
});

const mapDispatchToProps: MapDispatchToProps<P, P> = (dispatch) => ({
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => (
		dispatch(
			setFormat(e.currentTarget.value)
		)
	),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Input);
