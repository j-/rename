import * as React from 'react';
import { Renamer } from './renamer';
import { setDownloadURL } from './download';
import './App.css';

export interface Props {

}

interface State {
	url: string | null;
	file: File | null;
	format: string;
}

export default class App extends React.Component<Props, State> {
	private renamer: Renamer;
	private count: number = 0;

	state: State = {
		url: null,
		file: null,
		format: '%basename_%YYYY-%MM-%DD_%HH-%mm-%ss%dotext',
	};

	componentDidMount () {
		window.addEventListener('dragover', this.handleWindowDragover);
		window.addEventListener('drop', this.handleWindowDrop);
	}

	componentWillUnmount () {
		window.removeEventListener('dragover', this.handleWindowDragover);
		window.removeEventListener('drop', this.handleWindowDrop);
	}

	render () {
		return (
			<div className="App">
				<h1>Rename</h1>

				<h2>Format</h2>

				<input
					className="App-format"
					type="text"
					value={this.state.format}
					onChange={this.handleFormatChange}
				/>

				<h2>Output</h2>

				{this.renderFile()}
			</div>
		);
	}

	private renderFile () {
		const { url, file } = this.state;
		if (!url || !file) {
			return null;
		}
		const name = this.getFileName(file);
		return (
			<a
				href={url}
				download={name}
				draggable={true}
				onDragStart={this.handleFileDragstart}
			>
				{name}
			</a>
		);
	}

	private handleFileDragstart = (e: React.DragEvent<HTMLAnchorElement>) => {
		const { dataTransfer } = e;
		const { file, url } = this.state;
		if (!file || !url) {
			return;
		}
		const { type } = file!;
		const name = e.currentTarget.download;
		setDownloadURL(dataTransfer, {
			file, url, type, name,
		});
	}

	private handleWindowDragover = (e: DragEvent) => {
		e.preventDefault();
	}

	private handleWindowDrop = (e: DragEvent) => {
		e.preventDefault();
		const { dataTransfer } = e;
		if (!dataTransfer) {
			return;
		}
		const { files } = dataTransfer;
		if (!files || !files.length) {
			return;
		}
		const file = files[0];
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			const url = URL.createObjectURL(file);
			this.setState({
				url,
				file,
			});
		});
		reader.readAsArrayBuffer(file);
		this.renamer = new Renamer(file);
		const count = this.count++;
		this.renamer.addRule(['count', () => count]);
	}

	private handleFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			format: e.currentTarget.value,
		});
	}

	private getFileName (file: File) {
		return this.renamer.format(this.state.format);
	}
}
