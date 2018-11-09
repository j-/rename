import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { RootReducerState, isFormatValid } from '../store';
import InvalidFormatWarning from '../components/InvalidFormatWarning';

interface StateProps {
	isFormatValid: boolean;
}

interface OwnProps {

}

interface Props extends StateProps, OwnProps {

}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, RootReducerState> = (state) => ({
	isFormatValid: isFormatValid(state),
});

const MaybeInvalidFormatWarning: React.StatelessComponent<Props> = ({ isFormatValid }) => (
	isFormatValid ? null : <InvalidFormatWarning />
);

export default connect(
	mapStateToProps,
)(MaybeInvalidFormatWarning);
