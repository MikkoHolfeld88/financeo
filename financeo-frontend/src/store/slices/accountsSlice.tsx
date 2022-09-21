import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import moment from "moment/moment";

interface IAccountProps {
    id?: any,
    type: "Account" | "Depot" | "Creditcard" | null,
    bank?: string,
    iban?: string,
    bic?: string
    owner?: string,
    created?: string,
    index?: number
}

interface AccountsState {
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
        addAccount: (state, action: PayloadAction<IAccountProps>) => {
            const addedAccount: IAccountProps = {
                id: uuidv4(),
                type: action.payload?.type ? action.payload?.type : 'Account',
                bank: action.payload?.bank ? action.payload?.bank : '- not set -',
                iban: action.payload?.iban ? action.payload?.iban : '- not set -',
                bic: action.payload?.bic ? action.payload?.bic : '- not set -',
                owner: action.payload?.owner ? action.payload?.owner : '- not set -',
                created: moment().toISOString()
            };

            if(state.data && state.data.length > 0) {
                state.data.push(addedAccount);
            }
            else {
                state.data = [addedAccount];
            }
        },
        addAccounts: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        },
        updateAccount: (state, action) => {
            const { value, id } = action.payload;
            const name: 'bank' | 'iban' | 'bic' | 'owner' | 'type' = action.payload.name;

            let updateAccount: IAccountProps = state.data[id - 1];

            if (updateAccount) {
                updateAccount[name] = value;
                state.data[id - 1] = updateAccount;
            }
        },
        deleteAccount: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter(account => account.id !== action.payload);
        },
        resetAccounts: (state) => {
            state.data = [];
            state.status = 'idle';
        }
    },
});

export const {addAccounts, updateAccount, deleteAccount, addAccount, resetAccounts} = accountsSlice.actions;

export type {IAccountProps, AccountsState};
export default accountsSlice.reducer;
