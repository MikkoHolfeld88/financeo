import store from "./store"
import {increment, decrement, incrementByAmount} from "./slices/counterSlice";
import {changeMonth} from "./slices/monthPickerSlice";
import {changeYear} from "./slices/yearPickerSlice";
import {
    getAllAccounts,
    getAccountById,
    deleteAccount,
    updateAccount,
    updateAccounts,
    addAccount
} from "./slices/accountsSlice";


export {
    store,
    increment,
    incrementByAmount,
    decrement,
    changeMonth,
    changeYear,
    getAllAccounts,
    getAccountById,
    deleteAccount,
    updateAccount,
    updateAccounts,
    addAccount
}