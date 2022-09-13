import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAccountProps} from "../../store";

interface IAccountPickerProps {
    pickedAccounts: string | string[];
    ids: string | string[];
}

interface AccountPickerState {
    pickedAccounts: string | string[];
    ids: string | string[];
    status: 'idle' | 'pending' | 'loaded' | 'failed';
}

const initialState: AccountPickerState = {
    pickedAccounts: [],
    ids: [],
    status: 'idle'
}

export const accountPickerSlice = createSlice({
    name: 'accountPicker',
    initialState,
    reducers: {
        changePickedAccounts: (state, action: PayloadAction<IAccountPickerProps>) => {
            const {pickedAccounts, ids} = action.payload;

            console.log(ids);

            state.pickedAccounts = pickedAccounts;
            state.ids = ids;
            state.status = 'loaded';
        },
        removePickedAccount: (state, action) => {
            if(typeof state.pickedAccounts === 'object'){
                state.pickedAccounts.forEach((pickedAccount, index) => {
                    if(pickedAccount.includes(action.payload)){
                        typeof state.pickedAccounts === 'object' && state.pickedAccounts.splice(index, 1);
                    }
                })
            }
        },
        adjustPickedAccounts: (state, action: PayloadAction<{accounts: IAccountProps[]}>) => {
            // compares pickedAccounts with allAccounts and removes the ones that are not in allAccounts
            action.payload.accounts.forEach((account) => {
                if(typeof state.pickedAccounts === 'object'){
                    state.pickedAccounts.forEach((pickedAccount, index) => {
                        if(!pickedAccount.includes(account.id)){
                            typeof state.pickedAccounts === 'object' && state.pickedAccounts.splice(index, 1);
                        }
                    })
                }
            })
        },
        resetAccountPicker: (state) => {
            state.pickedAccounts = [];
            state.ids = [];
            state.status = 'idle';
        }
    },
});

export const {changePickedAccounts, resetAccountPicker, removePickedAccount, adjustPickedAccounts} = accountPickerSlice.actions;
export type {IAccountPickerProps};
export default accountPickerSlice.reducer;
