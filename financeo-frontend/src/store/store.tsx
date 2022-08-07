import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
import loginReducer from './slices/loginSlice';
import monthPickerReducer from './slices/monthPickerSlice';
import yearPickerReducer from './slices/yearPickerSlice';
import accountsReducer from "./slices/accountsSlice";
import accountPickerReducer from "./slices/accountPickerSlice";
import submenuAccountingReducer from "./slices/submenuAccountingSlice";
import CSVUploaderReducer from "./slices/CSVUploaderSlice";
import accountDataReducer from "./slices/accountDataSlice";
import CSVMapperReducer from "./slices/CSVMapperSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        monthPicker: monthPickerReducer,
        yearPicker: yearPickerReducer,
        accountPicker: accountPickerReducer,
        accounts: accountsReducer,
        submenuAccounting: submenuAccountingReducer,
        CSVUploader: CSVUploaderReducer,
        CSVMapper: CSVMapperReducer,
        accountData: accountDataReducer,
    }
})

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;