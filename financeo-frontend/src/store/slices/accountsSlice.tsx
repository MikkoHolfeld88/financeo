import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {IAccountProps} from "../../components/account/Account";
import React from 'react';
import {auth, db} from '../../services/firebaseService';
import {doc, getDoc} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";

export interface AccountsState {
    data: IAccountProps[];
    status?: 'idle' | 'loading' | 'succeeded' | 'failed',
    error?: string | null
}

const initialState: AccountsState = {
    data: [],
    status: 'idle',
    error: null,
}

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        updateAccounts: (state, action: PayloadAction<IAccountProps[] | any> | any) => {
            state.data = action.payload.accounts;
        },

    },
    extraReducers(builder) {
        builder
            .addCase(fetchAccounts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                // @ts-ignore
                state.data = state.data.concat(action.payload)
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
    const [ user ] = useAuthState(auth);

    console.log(user);
    console.log("AHu")

    // @ts-ignore
    const docRef = doc(db, 'accountsAndDepots', user?.uid?.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("error");
    }
})

export const { updateAccounts } = accountsSlice.actions;

export const getAllAccounts = (state: AccountsState) => state.data;
export const getAccountById = (state: AccountsState, acccountId: number) =>
    state.data.find((account: IAccountProps) => account.id === acccountId);

export default accountsSlice.reducer;