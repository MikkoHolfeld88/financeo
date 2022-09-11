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
    usage: string,
    type: string,
    amount: string,
    date: string,
    receiver: string
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
export type {AccountingDataValueType, AccountingDataType};
export default accountingDataSlice.reducer;
