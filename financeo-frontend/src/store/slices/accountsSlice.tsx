import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {IAccountProps} from "../../components/account/Account";
import axios from "axios";

interface AccountsState {
    accounts: IAccountProps[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
}

const initialState: AccountsState = {
    accounts: [],
    status: 'idle',
    error: null,
}

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
        }
    },
});

export const getAccounts = createAsyncThunk('accounts/getAccounts', async () => {
    const response = await axios.get('api');
    return response.data;
})

export const { addAccount, deleteAccount, updateAccount } = accountsSlice.actions;

export const getAllAccounts = (state: { accounts: { accounts: IAccountProps[]; }; }) => state.accounts.accounts;
export const getAccountById = (state: { accounts: { accounts: IAccountProps[]; }; }, acccountId: number) =>
    state.accounts.accounts.find((account: IAccountProps) => account.id === acccountId);

export default accountsSlice.reducer;