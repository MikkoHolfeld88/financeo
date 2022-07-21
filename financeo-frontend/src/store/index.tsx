import store from "./store"
import {increment, decrement, incrementByAmount} from "./slices/counterSlice";
import {changeMonth} from "./slices/monthPickerSlice";
import {changeYear} from "./slices/yearPickerSlice";
import {
    fetchAccounts,
    getAllAccounts,
    getAccountById,
    deleteAccount,
    updateAccount,
    addAccount
} from "./slices/accountsSlice";


export {
    store,
    increment,
    incrementByAmount,
    decrement,
    changeMonth,
    changeYear,
    fetchAccounts,
    getAllAccounts,
    getAccountById,
    deleteAccount,
    updateAccount,
    addAccount
}