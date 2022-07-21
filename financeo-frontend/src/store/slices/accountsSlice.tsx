import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {IAccountProps} from "../../components/account/Account";
import { ACCOUNTS_API } from "../../constants/urls";
import axios from "axios";
import {auth} from "../../services/firebaseService";
import {useAuthState} from "react-firebase-hooks/auth";


export interface AccountsState {
    accounts: IAccountProps[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
}

const initialState: AccountsState = {
    accounts: [],
    status: 'idle',
    error: null,
}

export const fetchAccounts = createAsyncThunk('accounts/getAccounts', async () => {
    const [user] = useAuthState(auth);
    const response = await axios.get(ACCOUNTS_API + user?.uid);
    return response.data;
})

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<IAccountProps>) => {
            state.accounts.push(action.payload);
        },
        deleteAccount: (state, action: PayloadAction<IAccountProps>) => {
            const { id } = action.payload;
            const deletionIndex = state.accounts.findIndex(account => account.id === id);
            state.accounts.splice( deletionIndex, 1 );
        },
        updateAccount: (state, action: PayloadAction<IAccountProps>) => {
            const { id, bank, bic, iban, owner, type } = action.payload;
            const existingAccount = state.accounts.find(post => post.id === id)
            if (existingAccount) {
                existingAccount.bank = bank;
                existingAccount.bic = bic;
                existingAccount.iban = iban;
                existingAccount.owner = owner;
                existingAccount.type = type;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAccounts.pending, (state: AccountsState, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAccounts.fulfilled, (state: AccountsState, action) => {
                state.status = 'succeeded';
                // Add any fetched posts to the array
                state.accounts = state.accounts.concat(action.payload);
            })
            .addCase(fetchAccounts.rejected, (state: AccountsState, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            })
    }
});

export const { addAccount, deleteAccount, updateAccount } = accountsSlice.actions;

export const getAllAccounts = (state: { accounts: { accounts: IAccountProps[]; }; }) => state.accounts.accounts;
export const getAccountById = (state: { accounts: { accounts: IAccountProps[]; }; }, acccountId: number) =>
    state.accounts.accounts.find((account: IAccountProps) => account.id === acccountId);

export default accountsSlice.reducer;