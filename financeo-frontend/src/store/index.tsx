import store from "./store"
import {increment, decrement, incrementByAmount} from "./slices/counterSlice";
import {changeMonth} from "./slices/monthPickerSlice";


export {
    store,
    increment, incrementByAmount, decrement,
    changeMonth,
}