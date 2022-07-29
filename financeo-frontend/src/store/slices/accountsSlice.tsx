import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAccountProps} from "../../components/account/Account";
import moment from "moment/moment";

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
            state.data = state.data.filter(account => account.id === action.payload);
        },
        addAccount: (state, action) => {
            console.log(action.payload);
            const addedAccount: IAccountProps = {
                id: 2,
                type: "Account",
                bank: "BANK",
                iban: "IBAN",
                bic: "BIC",
                owner: "OWNER",
                created: moment().toDate()
            };
            let newAccountList = state.data ? state.data : [];
            newAccountList.push(addedAccount);
            state.data = newAccountList;
        },
    },
});

export const {addAccounts, updateAccount, deleteAccount, addAccount} = accountsSlice.actions;

export default accountsSlice.reducer;