import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import moment from "moment/moment";
import {FIRESTORE_COLLECTIONS} from "../../../services/databaseService/colletions";
import getData from "../../../services/databaseService/databaseService";
import {STATUS} from "../../../types/general";

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
    status: STATUS;
    error: string | undefined;
}

const initialState: AccountsState = {
    data: [],
    status: STATUS.IDLE,
    error: undefined
}

export const fetchAccounts = createAsyncThunk(
    'accounts/fetchAccounts',
    async (currentUid: string, {rejectWithValue}) => {
        try {
            const documentData: any = await getData(FIRESTORE_COLLECTIONS.ACCOUNTS_AND_DEPOTS, currentUid);
            const {uid, ...accounts} = documentData;

            if (accounts) {
                return accounts;
            }

            return null;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

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
            state.status = STATUS.IDLE;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccounts.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.status = STATUS.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                state.error = action.error.message;
                state.data = [];
            })
    }
});

export const {addAccounts, updateAccount, deleteAccount, addAccount, resetAccounts} = accountsSlice.actions;

export type {IAccountProps, AccountsState};
export default accountsSlice.reducer;
