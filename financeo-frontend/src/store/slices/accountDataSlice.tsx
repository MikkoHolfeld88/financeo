import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAccountProps} from "../../components/account/Account";

interface AccountDataState {
    value: string[][] | string[];
    status: 'idle' | 'pending' | 'loaded' | 'failed';
}

const initialState: AccountDataState = {
    value: [],
    status: 'idle'
}

export const accountDataSlice = createSlice({
    name: 'accountPicker',
    initialState,
    reducers: {
        setAccountData: (state, action: PayloadAction<string[][] | string[]>) => {
            state.value = action.payload;
            state.status = 'loaded';
        },
        resetAccountData: (state) => {
            state.value = [];
            state.status = 'idle';
        }
    },
});

export const {setAccountData, resetAccountData} = accountDataSlice.actions;
export default accountDataSlice.reducer;