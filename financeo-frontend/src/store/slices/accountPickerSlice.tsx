import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAccountProps} from "../../store";

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
        removePickedAccount: (state, action) => {
            if(typeof state.value === 'object'){
                state.value.forEach((pickedAccount, index) => {
                    if(pickedAccount.includes(action.payload)){
                        typeof state.value === 'object' && state.value.splice(index, 1);
                    }
                })
            }
        },
        adjustPickedAccounts: (state, action: PayloadAction<{accounts: IAccountProps[]}>) => {
            // compares pickedAccounts with allAccounts and removes the ones that are not in allAccounts
            action.payload.accounts.forEach((account) => {
                if(typeof state.value === 'object'){
                    state.value.forEach((pickedAccount, index) => {
                        if(!pickedAccount.includes(account.id)){
                            typeof state.value === 'object' && state.value.splice(index, 1);
                        }
                    })
                }
            })
        },
        resetAccountPicker: (state) => {
            state.value = [];
            state.status = 'idle';
        }
    },
});

export const {changePickedAccounts, resetAccountPicker, removePickedAccount, adjustPickedAccounts} = accountPickerSlice.actions;
export default accountPickerSlice.reducer;
