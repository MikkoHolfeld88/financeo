import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AccountingDataValueType = {
    [key: string]: AccountingDataType
};

type AccountingDataType = {
    data: AccountingData[],
    created?: string,
    accountName?: string
};

interface AccountingData {
    date: string,
    usage: string,
    receiver: string,
    type: string,
    amount: number
}

interface AccountingDataState {
    value: AccountingDataValueType[];
    status: 'idle' | 'pending' | 'loaded' | 'failed';
}

const initialState: AccountingDataState = {
    value: [],
    status: 'idle'
}

export const accountingDataSlice = createSlice({
    name: 'accountingData',
    initialState,
    reducers: {
        setAccountingData: (state, action: PayloadAction<any>) => {
            state.status = 'pending';
            state.value = action.payload;
            state.status = 'loaded';
        },
        resetAccountingData: (state) => {
            state.value = [];
            state.status = 'idle';
        }
    },
});

export const {setAccountingData, resetAccountingData} = accountingDataSlice.actions;
export type {AccountingDataValueType, AccountingDataType, AccountingData};
export default accountingDataSlice.reducer;
