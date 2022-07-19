import store from "./store"
import {increment, decrement, incrementByAmount} from "./slices/counterSlice";
import {changeMonth} from "./slices/monthPickerSlice";
import {changeYear} from "./slices/yearPickerSlice";


export {
    store,
    increment,
    incrementByAmount,
    decrement,
    changeMonth,
    changeYear
}