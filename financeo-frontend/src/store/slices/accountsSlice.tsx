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
            // TODO: Fix Bug when Field is empty, Redux cannot save it anymore
            const { value, id } = action.payload;
            console.log(value);
            const name: 'bank' | 'iban' | 'bic' | 'owner' | 'type' = action.payload.name;
            let updateAccount: IAccountProps = state.data[id];
            console.log(updateAccount);
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