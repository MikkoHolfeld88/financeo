import store from "./store"
import {decrement, increment, incrementByAmount} from "./slices/counterSlice";
import {changeMonth} from "./slices/monthPickerSlice";
import {changeYear} from "./slices/yearPickerSlice";
import {addAccounts, updateAccount} from "./slices/accountsSlice";

export {
    store,
    increment,
    incrementByAmount,
    decrement,
    changeMonth,
    changeYear,
    addAccounts,
    updateAccount
}