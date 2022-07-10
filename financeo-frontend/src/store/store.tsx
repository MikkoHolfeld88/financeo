import counterReducer from './slices/counterSlice';
import loginReducer from './slices/loginSlice';
import monthPickerReducer from './slices/monthPickerSlice';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        login: loginReducer,
        counter: counterReducer,
        monthPicker: monthPickerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store;