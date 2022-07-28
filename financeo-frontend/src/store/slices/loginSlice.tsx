import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoginState {
    errorMessage?: string;
    status: 'idle' | 'pending' | 'loaded' | 'failed';
    uid: string | 'none';
}

const initialState: LoginState = {
    errorMessage: "",
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
            state.status = 'loaded';
        },
        setStatus: (state, action: PayloadAction<'idle' | 'pending' | 'loaded' | 'failed'>) => {
            state.status = action.payload;
        },
    },
});

export const {setErrorMessage, setStatus, setUid} = loginSlice.actions;
export default loginSlice.reducer;