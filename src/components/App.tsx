import * as React from 'react';
import FileDropper from '../containers/FileDropper';
import FormatInput from '../containers/FormatInput';
import MaybeInvalidFormatWarning from '../containers/MaybeInvalidFormatWarning';
import ExampleFormat from '../containers/ExampleFormat';
import FileDownloadList from '../containers/FileDownloadList';

const App: React.StatelessComponent = () => (
	<div className="App container">
		<FileDropper />

		<h1>Rename</h1>

		<p>Drag+drop files into this window.</p>

		<h2>Format</h2>

		<FormatInput />
		<MaybeInvalidFormatWarning />

		<h3>Example</h3>

		<ExampleFormat />

		<h2>Output</h2>

		<FileDownloadList />
	</div>
);

export default App;
