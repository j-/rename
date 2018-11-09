import { Action } from 'redux';

/* Add file */

export interface ActionAddFile extends Action {
	type: 'AddFile';
	data: {
		file: File;
		url: string;
	};
}

export const isActionAddFile = (action: Action): action is ActionAddFile => (
	action.type === 'AddFile'
);

export const addFile = (file: File, url: string): ActionAddFile => ({
	type: 'AddFile',
	data: {
		file,
		url,
	},
});

/* Clear files */

export interface ActionClearFiles extends Action {
	type: 'ClearFiles';
}

export const isActionClearFiles = (action: Action): action is ActionClearFiles => (
	action.type === 'ClearFiles'
);

export const clearFiles = (value: number): ActionClearFiles => ({
	type: 'ClearFiles',
});

/* Set counter */

export interface ActionSetCounter extends Action {
	type: 'SetCounter';
	data: {
		value: number;
	};
}

export const isActionSetCounter = (action: Action): action is ActionSetCounter => (
	action.type === 'SetCounter'
);

export const setCounter = (value: number): ActionSetCounter => ({
	type: 'SetCounter',
	data: {
		value,
	},
});

/* Set format */

export interface ActionSetFormat extends Action {
	type: 'SetFormat';
	data: {
		format: string;
	};
}

export const isActionSetFormat = (action: Action): action is ActionSetFormat => (
	action.type === 'SetFormat'
);

export const setFormat = (format: string): ActionSetFormat => ({
	type: 'SetFormat',
	data: {
		format,
	},
});
