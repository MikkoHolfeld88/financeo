import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoginState {
    errorMessage?: string;
    uid: string | 'none';
    status: 'idle' | 'pending' | 'loaded' | 'failed';
}

const initialState: LoginState = {
    errorMessage: " ",
    uid: 'none',
    status: 'idle'
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.status = 'failed';
        },
        setUid: (state, action: PayloadAction<string>) => {
            state.uid = action.payload;
        },
        setStatus: (state, action: PayloadAction<'idle' | 'pending' | 'loaded' | 'failed'>) => {
            state.status = action.payload;
        },
        resetLogin: (state) => {
            state.errorMessage = "";
            state.status = 'idle';
            state.uid = 'none';
        }
    },
});

export const {setErrorMessage, setStatus, setUid, resetLogin} = loginSlice.actions;
export default loginSlice.reducer;