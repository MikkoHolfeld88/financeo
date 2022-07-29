import {createSlice} from '@reduxjs/toolkit';
import {IAccountProps} from "../../components/account/Account";

export interface AccountsState {
    data: IAccountProps[];
    status: 'idle' | 'loaded' | 'pending' | 'failed';
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
            }
        },
        deleteAccount: (state, action) => {
            console.log(action.payload);
            console.log(state.data.filter(account => account.id === action.payload));
            state.data = state.data.filter(account => account.id === action.payload);
        }
    },
});

export const {addAccounts, updateAccount, deleteAccount} = accountsSlice.actions;

export default accountsSlice.reducer;