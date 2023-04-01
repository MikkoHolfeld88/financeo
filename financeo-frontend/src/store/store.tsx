import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
import loginReducer from './slices/login/loginSlice';
import monthPickerReducer from './slices/monthPicker/monthPickerSlice';
import yearPickerReducer from './slices/yearPicker/yearPickerSlice';
import accountsReducer from "./slices/accounts/accountsSlice";
import accountPickerReducer from "./slices/accountPicker/accountPickerSlice";
import CSVUploaderReducer from "./slices/csvUploader/CSVUploaderSlice";
import accountingDataReducer from "./slices/accountingData/accountingDataSlice"
import CSVMapperReducer from "./slices/csvMapper/CSVMapperSlice";
import accountingCategoryReducer from "./slices/accountingCategory/accountingCategorySlice";
import appConfigReducer from "./slices/appConfig/appConfigSlice";

const store = configureStore({
    reducer: {
        accounts: accountsReducer,
        accountPicker: accountPickerReducer,
        accountingCategory: accountingCategoryReducer,
        accountingData: accountingDataReducer,
        appConfig: appConfigReducer,
        CSVMapper: CSVMapperReducer,
        CSVUploader: CSVUploaderReducer,
        login: loginReducer,
        monthPicker: monthPickerReducer,
        yearPicker: yearPickerReducer,
    }
})

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;
