import { Reducer } from 'redux';
import { getInvalidCharacterExpression } from '../renamer';

import {
	isActionAddFile,
	isActionClearFiles,
	isActionSetCounter,
	isActionSetFormat,
} from './actions';

export interface RootReducerState {
	files: Array<{
		url: string;
		count: number;
		file: File;
	}>;
	counter: number;
	format: string;
	isFormatValid: boolean;
}

const DEFAULT_STATE = {
	files: [],
	counter: 0,
	format: '%basename_%YYYY-%MM-%DD_%HH-%mm-%ss%dotext',
	isFormatValid: true,
};

const reducer: Reducer<RootReducerState> = (state = DEFAULT_STATE, action) => {
	if (isActionAddFile(action)) {
		const { files, counter } = state;
		const { file, url } = action.data;
		const count = counter + 1;
		return {
			...state,
			files: [...files, {
				url,
				file,
				count,
			}],
			counter: count,
		};
	}

	if (isActionClearFiles(action)) {
		return {
			...state,
			files: [],
		};
	}

	if (isActionSetCounter(action)) {
		return {
			...state,
			counter: action.data.value,
		};
	}

	if (isActionSetFormat(action)) {
		const { format } = action.data;
		const isFormatValid = !getInvalidCharacterExpression().test(format);
		return {
			...state,
			format,
			isFormatValid,
		};
	}

	return state;
};

export default reducer;

export const getFormat = (state: RootReducerState) => (
	state.format
);

export const isFormatValid = (state: RootReducerState) => (
	state.isFormatValid
);

export const getFileCount = (state: RootReducerState) => (
	state.files.length
);

export const isIndexValid = (state: RootReducerState, index: number) => (
	index >= 0 &&
	index <= state.files.length &&
	state.files.length > 0
);

export const getURLByIndex = (state: RootReducerState, index: number) => (
	isIndexValid(state, index) ?
		state.files[index].url :
		null
);

export const getCounterByIndex = (state: RootReducerState, index: number) => (
	isIndexValid(state, index) ?
		state.files[index].count :
		null
);

export const getFileByIndex = (state: RootReducerState, index: number) => (
	isIndexValid(state, index) ?
		state.files[index].file :
		null
);
