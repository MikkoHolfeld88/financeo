import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import moment from "moment";

interface AccountPickerState {
    value: string | string[];
    status: 'idle' | 'pending' | 'loaded' | 'failed';
}

const initialState: AccountPickerState = {
    value: [],
    status: 'idle'
}

export const accountPickerSlice = createSlice({
    name: 'accountPicker',
    initialState,
    reducers: {
        changePickedAccounts: (state, action: PayloadAction<string | string[]>) => {
            state.value = action.payload;
            state.status = 'loaded';
        },
        removePickedAccount: (state, action: PayloadAction<number>) => {
            // TODO: Add Deletion of AccountPicker

        },
        resetAccountPicker: (state) => {
            state.value = [];
            state.status = 'loaded';
        }
    },
});

export const {changePickedAccounts, resetAccountPicker, removePickedAccount} = accountPickerSlice.actions;
export default accountPickerSlice.reducer;