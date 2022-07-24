import {createSlice} from '@reduxjs/toolkit';
import {IAccountProps} from "../../components/account/Account";
import React from 'react';

export interface AccountsState {
    data: IAccountProps[];
    status: 'loaded' | 'idle' | 'addedRecently' | 'updatedRecently';
}

const initialState: AccountsState = {
    data: [],
    status: 'idle'
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
            const { value, id,  name } = action.payload;
            console.log(id);
            const updateIndex = state.data.findIndex(account => account.id === id);
            const updateAccount = (state.data[updateIndex]);
            if (updateIndex && updateAccount) {
                // @ts-ignore
                updateAccount[name] = value;
                // @ts-ignore
                console.log(updateAccount);
                state.data[updateIndex] = updateAccount;
            }
        }
    },
});

export const {addAccounts, updateAccount} = accountsSlice.actions;

export default accountsSlice.reducer;