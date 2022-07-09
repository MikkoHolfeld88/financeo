import counterReducer from './slices/counterSlice';
import loginReducer from './slices/loginSlice';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        login: loginReducer,
        counter: counterReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store;