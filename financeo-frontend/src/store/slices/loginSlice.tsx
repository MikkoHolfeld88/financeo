import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoginState {
    errorMessage?: string;
    status: 'idle' | 'pending' | 'loaded' | 'failed';
    uid: string | 'none';
}

const initialState: LoginState = {
    errorMessage: " ",
    status: 'idle',
    uid: 'none'
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