import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Edge} from "react-flow-renderer";
import {AccountingData} from "./accountingDataSlice";

interface ICSVUploaderProps {
    data: string[][] | any;
    mappedData: AccountingData[];
    errors: any[];
    meta: any[];
    accountId: string;
    status: 'idle' | 'pending' | 'loaded' | 'failed';
}

interface CSVUploaderState {
    head: string[];
    data: string[][];
    mappedData: AccountingData[];
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

const transformDate = (date: string): string => {
    // TODO: date parsing auf verschiedene Schreibarten anpassen
    if (date !== undefined && date !== null &&
        date !== "" && date.length >= 6 &&  date.length <= 11) {
        let splitSymbol: string = ".";

        if (date.includes("/")) {splitSymbol = "/"};
        if (date.includes("-")) {splitSymbol = "-"};

        const dateParts = date.split(splitSymbol);
        let year = dateParts[2];

        if(year.length > 2){year = year.slice(2);}

        return `20${year}-${dateParts[1]}-${dateParts[0]}`;
    }

    return "0000-00-00";
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

            let mappedRows: AccountingData[] = [];

            state.data.map((row: string[]) => {
                let mappedColumns: any = {};
                sortedActionPayload.map((edge: Edge) => {
                    const sourceIndex = Number(edge.source.split("_")[0]);
                    const targetName = edge.target.split("_")[1];

                    if (row[sourceIndex] !== undefined) {
                        switch (targetName) {
                            case "amount":
                                const numberValue = row[sourceIndex].split(" ")[0];
                                const decimalSeparatorMatch = numberValue.match(/([,\.])\d{2}$/);
                                const decimalSeparator = decimalSeparatorMatch ? decimalSeparatorMatch[1] : "";
                                const decimalValue = parseFloat(numberValue.replace(new RegExp(`[^0-9-${decimalSeparator}]`, "g"), ""));

                                mappedColumns[targetName] = decimalValue;
                                break;
                            case "date":
                                mappedColumns[targetName] = transformDate(row[sourceIndex]);
                                break;
                            default:
                                mappedColumns[targetName] = row[sourceIndex];
                                break;
                        }
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
