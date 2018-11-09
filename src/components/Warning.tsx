import * as React from 'react';

export interface Props {

}

const Warning: React.StatelessComponent<Props> = ({ children }) => (
	<div className="Warning">
		{children}
	</div>
);

export default Warning;
