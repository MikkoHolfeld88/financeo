import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import getData from "../../../services/databaseService/databaseService";
import {FIRESTORE_COLLECTIONS} from "../../../services/databaseService/colletions";
import {STATUS, Status} from "../../../types/general";

type AccountingDataValueType = {
    [key: string]: AccountingDataType
};

type AccountingDataType = {
    data: AccountingData[],
    created?: string,
    accountName?: string
};

interface AccountingData {
    id?: any,
    date: string,
    usage: string,
    receiver: string,
    type: string,
    amount: number,
    category: string | null,
}

interface AccountingDataState {
    value: AccountingDataValueType[];
    status: Status;
    error: string | undefined;
}

const initialState: AccountingDataState = {
    value: [],
    status: STATUS.IDLE,
    error: ''
}

export const fetchAccountingData = createAsyncThunk(
    'accountingData/fetchAccountingData',
    async (currentUid: string, {rejectWithValue}) => {
        try {
            const documentData: any = await getData(FIRESTORE_COLLECTIONS.ACCOUNTING_DATA, currentUid);
            const {uid, ...accountingData} = documentData;

            if (accountingData) {
                return accountingData;
            }

            return null;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const accountingDataSlice = createSlice({
    name: 'accountingData',
    initialState,
    reducers: {
        setAccountingData: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
        resetAccountingData: (state) => {
            state.value = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccountingData.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(fetchAccountingData.fulfilled, (state, action: PayloadAction<any>) => {
                state.value = action.payload;
                state.status = STATUS.SUCCEEDED;
            })
            .addCase(fetchAccountingData.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                state.error = action.error.message;
            })
    }
});

export const {setAccountingData, resetAccountingData} = accountingDataSlice.actions;
export type {AccountingDataValueType, AccountingDataType, AccountingData};
export default accountingDataSlice.reducer;
