import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ICSVUploaderProps {
    data: string[][];
    errors: any[];
    meta: any[];
}

interface CSVUploaderState {
    head: string[];
    data: string[][];
    errors: any[];
    meta: any[];
}

const initialState: CSVUploaderState = {
    head: [],
    data: [],
    errors: [],
    meta: []
}

export const CSVUploaderSlice = createSlice({
    name: 'csvUploader',
    initialState,
    reducers: {
        addCSVData: (state, action: PayloadAction<string[][]>) => {
            state.head = action.payload[0];
            state.data = action.payload.filter((value: string[], index: number) => 0 !== index);
        },
        setCSVUploadError: (state, action: PayloadAction<ICSVUploaderProps>) => {
            const {errors, meta} = action.payload;
            state.errors = errors;
            state.meta = meta;
        },
        resetCSVUploaderState: (state) => {
            state.head = [];
            state.data = [];
            state.errors = [];
            state.meta = [];
        }
    },
});

export const {addCSVData, setCSVUploadError, resetCSVUploaderState} = CSVUploaderSlice.actions;
export type {ICSVUploaderProps};
export default CSVUploaderSlice.reducer;