import counterReducer from './slices/counterSlice';
import loginReducer from './slices/loginSlice';
import monthPickerReducer from './slices/monthPickerSlice';
import yearPickerReducer from './slices/yearPickerSlice';
import {configureStore} from '@reduxjs/toolkit';
import accountsReducer from "./slices/accountsSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        counter: counterReducer,
        monthPicker: monthPickerReducer,
        yearPicker: yearPickerReducer,
        accounts: accountsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store;