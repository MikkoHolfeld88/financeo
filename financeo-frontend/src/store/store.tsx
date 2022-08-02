import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
import counterReducer from './slices/counterSlice';
import loginReducer from './slices/loginSlice';
import monthPickerReducer from './slices/monthPickerSlice';
import yearPickerReducer from './slices/yearPickerSlice';
import accountsReducer from "./slices/accountsSlice";
import accountPickerReducer from "./slices/accountPickerSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        counter: counterReducer,
        monthPicker: monthPickerReducer,
        yearPicker: yearPickerReducer,
        accountPicker: accountPickerReducer,
        accounts: accountsReducer,
    }
})

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;