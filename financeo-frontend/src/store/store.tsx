import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
import loginReducer from './slices/loginSlice';
import monthPickerReducer from './slices/monthPickerSlice';
import yearPickerReducer from './slices/yearPickerSlice';
import accountsReducer from "./slices/accountsSlice";
import accountPickerReducer from "./slices/accountPickerSlice";
import submenuAccountingReducer from "./slices/submenuAccountingSlice";
import CSVUploaderReducer from "./slices/CSVUploaderSlice";
import accountingDataReducer from "./slices/accountingDataSlice"
import CSVMapperReducer from "./slices/CSVMapperSlice";
import accountingCategoryReducer from "./slices/accountingCategorySlice/accountingCategorySlice";

const store = configureStore({
    reducer: {
        accounts: accountsReducer,
        accountPicker: accountPickerReducer,
        accountingCategory: accountingCategoryReducer,
        accountingData: accountingDataReducer,
        CSVMapper: CSVMapperReducer,
        CSVUploader: CSVUploaderReducer,
        login: loginReducer,
        monthPicker: monthPickerReducer,
        submenuAccounting: submenuAccountingReducer,
        yearPicker: yearPickerReducer,
    }
})

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;
