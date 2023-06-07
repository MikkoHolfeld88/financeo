import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAccountProps} from "../../index";
import {STATUS} from "../../../types/general";

interface IAccountPickerProps {
    pickedAccounts: string | string[];
    ids: string | string[];
}

interface AccountPickerState {
    pickedAccounts: string | string[];
    ids: string | string[];
    status: STATUS;
}

const initialState: AccountPickerState = {
    pickedAccounts: [],
    ids: [],
    status: STATUS.IDLE
}

export const accountPickerSlice = createSlice({
    name: 'accountPicker',
    initialState,
    reducers: {
        changePickedAccounts: (state, action: PayloadAction<IAccountPickerProps>) => {
            const {pickedAccounts, ids} = action.payload;

            state.pickedAccounts = pickedAccounts ? pickedAccounts : [];
            state.ids = ids ? ids : [];
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
            // action.payload.accounts.forEach((account) => {
            //     if(typeof state.pickedAccounts === 'object'){
            //         state.pickedAccounts.forEach((pickedAccount, index) => {
            //             if(!pickedAccount.includes(account.id)){
            //                 typeof state.pickedAccounts === 'object' && state.pickedAccounts.splice(index, 1);
            //             }
            //         })
            //     }
            // })
            action.payload.accounts.forEach((account) => {
                if (Array.isArray(state.pickedAccounts)) {
                    state.pickedAccounts = state.pickedAccounts.filter((pickedAccount) => {
                        return pickedAccount.includes(account.id);
                    });
                }
            });
        },
        resetAccountPicker: (state) => {
            state.pickedAccounts = [];
            state.ids = [];
            state.status = STATUS.IDLE;
        }
    },
});

export const {changePickedAccounts, resetAccountPicker, removePickedAccount, adjustPickedAccounts} = accountPickerSlice.actions;
export type {IAccountPickerProps};
export default accountPickerSlice.reducer;
