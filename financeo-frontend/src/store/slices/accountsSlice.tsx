import {createSlice} from '@reduxjs/toolkit';
import {IAccountProps} from "../../components/account/Account";
import React from 'react';

export interface AccountsState {
    data: IAccountProps[];
    status: 'loaded' | 'idle' | 'addedRecently' | 'updatedRecently' | 'deletedRecently';
}

const initialState: AccountsState = {
    data: [],
    status: 'idle',
}

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        addAccounts: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        },
        updateAccount: (state, action) => {
            const { value, id } = action.payload;
            const name: 'bank' | 'iban' | 'bic' | 'owner' | 'type' = action.payload.name;
            let updateAccount: IAccountProps = state.data[id];
            if (updateAccount) {
                updateAccount[name] = value;
                state.data[id] = updateAccount;
                state.status = 'updatedRecently';
            }
        }
    },
});

export const {addAccounts, updateAccount} = accountsSlice.actions;

export default accountsSlice.reducer;