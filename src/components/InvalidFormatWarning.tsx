import * as React from 'react';
import Warning from './Warning';

export interface Props {

}

const InvalidFormatWarning: React.StatelessComponent<Props> = ({ children }) => (
	<Warning>
		Contains invalid characters which will be removed.
	</Warning>
);

export default InvalidFormatWarning;
