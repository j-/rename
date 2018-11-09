import * as React from 'react';
import { Renamer } from '../renamer';

export interface Props {
	format: string;
}

const exampleFile = new File([], 'example.png', {
	lastModified: Date.now(),
	type: 'image/png',
});

const exampleRenamer = new Renamer(exampleFile);
exampleRenamer.addRule(['count', () => 1]);

const ExampleFormat: React.StatelessComponent<Props> = ({ format }) => (
	<div className="ExampleFormat">
		<span className="ExampleFormat-input">
			{exampleFile.name}
		</span>
		<span className="ExampleFormat-transform-indicator">
			&nbsp;
			&rarr;
			&nbsp;
		</span>
		<span className="ExampleFormat-output">
			{exampleRenamer.format(format)}
		</span>
	</div>
);

export default ExampleFormat;
