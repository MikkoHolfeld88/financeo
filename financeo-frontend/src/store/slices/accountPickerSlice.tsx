import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import moment from "moment";

interface AccountPickerState {
    value: string[];
    status: 'idle' | 'pending' | 'loaded' | 'failed';
}

const initialState: AccountPickerState = {
    value: [],
    status: 'loaded'
}

export const accountPickerSlice = createSlice({
    name: 'accountPicker',
    initialState,
    reducers: {
        changePickedAccount: (state, action: PayloadAction<string[]>) => {
            state.value = action.payload
        },
        resetAccountPicker: (state) => {
            state.value = [];
            state.status = 'loaded';
        }
    },
});

export const {changePickedAccount, resetAccountPicker} = accountPickerSlice.actions;
export default accountPickerSlice.reducer;