import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Edge} from "react-flow-renderer";

interface ICSVUploaderProps {
    data: string[][] | any;
    mappedData: any;
    errors: any[];
    meta: any[];
    accountId: string;
    status: 'idle' | 'pending' | 'loaded' | 'failed';
}

interface CSVUploaderState {
    head: string[];
    data: string[][];
    mappedData: any;
    errors: any[];
    meta: any[];
    accountId: string; // account the data belong to
    status: 'idle' | 'pending' | 'loaded' | 'failed'
}

const initialState: CSVUploaderState = {
    head: [],
    data: [],
    mappedData: [],
    errors: [],
    meta: [],
    accountId: " ",
    status: 'idle',
}

export const CSVUploaderSlice = createSlice({
    name: 'csvUploader',
    initialState,
    reducers: {
        addCSVData: (state, action: PayloadAction<string[][]>) => {
            state.head = action.payload[0];
            state.data = action.payload.filter((value: string[], index: number) => 0 !== index);
            state.status = 'pending';
        },
        setCSVUploadError: (state, action: PayloadAction<ICSVUploaderProps>) => {
            const {errors, meta} = action.payload;
            state.errors = errors;
            state.meta = meta;
        },
        setHead: (state, action: PayloadAction<string[]>) => {
            state.head = action.payload;
            state.status = 'pending';
        },
        mapData(state, action: PayloadAction<Edge[]>) {
            let actionPayloadCopy = [...action.payload]
            const sortedActionPayload = actionPayloadCopy.sort((a, b) =>
                Number(a.target.split("_")[0]) - Number(b.target.split("_")[0]));

            let mappedRows: any = [];

            state.data.map((row: string[]) => {
                let mappedColumns: any = {};
                sortedActionPayload.map((edge: Edge) => {
                    const sourceIndex = Number(edge.source.split("_")[0]);
                    const targetName = edge.target.split("_")[1];

                    if (row[sourceIndex] !== undefined) {
                        mappedColumns[targetName] = row[sourceIndex];
                    }
                })

                mappedRows.push(mappedColumns);
            });

            state.mappedData = mappedRows;
            state.status = 'loaded';
        },
        setAccountName(state, action: PayloadAction<string>) {
            state.accountId = action.payload;
        },
        resetCSVUploaderState: (state) => {
            state.head = [];
            state.data = [];
            state.errors = [];
            state.meta = [];
            state.mappedData = [];
            state.accountId = " ";
        }
    },
});

export const {addCSVData, setCSVUploadError, setHead, mapData,setAccountName, resetCSVUploaderState} = CSVUploaderSlice.actions;
export type {ICSVUploaderProps};
export default CSVUploaderSlice.reducer;