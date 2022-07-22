import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAccountProps} from "../../components/account/Account";

export interface AccountsState {
    data: IAccountProps[];
}

const initialState: AccountsState = {
    data: [],
}

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<IAccountProps>) => {
            state.data.push(action.payload);
        },
        deleteAccount: (state, action: PayloadAction<IAccountProps>) => {
            const {id} = action.payload;
            const deletionIndex = state.data.findIndex(account => account.id === id);
            state.data.splice(deletionIndex, 1);
        },
        updateAccount: (state, action: PayloadAction<IAccountProps>) => {
            const {id, bank, bic, iban, owner, type} = action.payload;
            const existingAccount = state.data.find(account => account.id === id);
            if (existingAccount) {
                existingAccount.bank = bank;
                existingAccount.bic = bic;
                existingAccount.iban = iban;
                existingAccount.owner = owner;
                existingAccount.type = type;
            }
        },
        updateAccounts: (state, action: PayloadAction<IAccountProps[] | any>) => {
            state.data = action.payload.accounts;

        },
        updateBank: (state, action: PayloadAction<{bank: string, id: number}>) => {
            const {id, bank} = action.payload;
            const updateAccount = state.data.find(account => account.id === id);
            if(updateAccount){
                updateAccount.bank = bank;
            }
        }
    }
});

export const {addAccount, deleteAccount, updateAccount, updateAccounts, updateBank} = accountsSlice.actions;

export const getAllAccounts = (state: AccountsState) => state.data;
export const getAccountById = (state: AccountsState, acccountId: number) =>
    state.data.find((account: IAccountProps) => account.id === acccountId);

export default accountsSlice.reducer;