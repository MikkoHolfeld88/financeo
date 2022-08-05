import store, {useAppDispatch, AppDispatch, RootState} from "./store"
import {setErrorMessage, setStatus, setUid, resetLogin} from "./slices/loginSlice";
import {changeMonth, resetMonthPicker} from "./slices/monthPickerSlice";
import {changeYear, resetYearPicker} from "./slices/yearPickerSlice";
import {addAccounts, addAccount, updateAccount, deleteAccount, resetAccounts} from "./slices/accountsSlice";
import {
    changePickedAccounts,
    resetAccountPicker,
    removePickedAccount,
    adjustPickedAccounts
} from "./slices/accountPickerSlice";
import StateLoader from "./StateLoader";

export {
    store, StateLoader, useAppDispatch,
    setErrorMessage, setStatus, setUid, resetLogin,
    changeMonth, resetMonthPicker,
    changeYear, resetYearPicker,
    addAccount, addAccounts, updateAccount, deleteAccount, resetAccounts,
    changePickedAccounts, removePickedAccount, adjustPickedAccounts, resetAccountPicker
}

export type {
    AppDispatch,
    RootState
}