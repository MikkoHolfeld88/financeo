import store, {useAppDispatch, AppDispatch, RootState} from "./store"
import {setErrorMessage, setStatus, setUid, resetLogin} from "./slices/loginSlice";
import {changeMonth, resetMonthPicker} from "./slices/monthPickerSlice";
import {changeYear, resetYearPicker} from "./slices/yearPickerSlice";
import {addAccounts, addAccount, updateAccount, deleteAccount, resetAccounts} from "./slices/accountsSlice";

export {
    store,
    useAppDispatch,
    setErrorMessage,
    setStatus,
    setUid,
    resetLogin,
    changeMonth,
    resetMonthPicker,
    changeYear,
    resetYearPicker,
    addAccounts,
    addAccount,
    updateAccount,
    deleteAccount,
    resetAccounts
}

export type {
    AppDispatch,
    RootState
}