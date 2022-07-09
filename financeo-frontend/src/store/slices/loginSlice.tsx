import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoginState {
    errorMessage: string;
}

const initialState: LoginState = {
    errorMessage: "",
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload
        },
    },
});

export const {setErrorMessage} = loginSlice.actions;
export default loginSlice.reducer;