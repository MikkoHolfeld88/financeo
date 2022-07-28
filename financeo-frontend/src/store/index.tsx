import store from "./store"
import {setErrorMessage, setStatus, setUid} from "./slices/loginSlice";
import {changeMonth} from "./slices/monthPickerSlice";
import {changeYear} from "./slices/yearPickerSlice";
import {addAccounts, updateAccount} from "./slices/accountsSlice";

export {
    store,
    setErrorMessage,
    setStatus,
    setUid,
    changeMonth,
    changeYear,
    addAccounts,
    updateAccount
}