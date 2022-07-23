import {createSlice, PayloadAction, createAsyncThunk, nanoid} from '@reduxjs/toolkit';
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

    },
});

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
    const [ user ] = useAuthState(auth);
    const safeUser = user ? user.uid.toString() : " noUserRecognized ";
    console.log(user);

    const docRef = doc(db, 'accountsAndDepots', safeUser);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const accountsPromise = docSnap.data();
        accountsPromise.then((accounts: IAccountProps[]) => {
            return accounts;
        })
    } else {
        console.log("error");
    }
})

export const { } = accountsSlice.actions;

export const getAllAccounts = (state: AccountsState) => state.data;
export const getAccountById = (state: AccountsState, acccountId: number) =>
    state.data.find((account: IAccountProps) => account.id === acccountId);

export default accountsSlice.reducer;