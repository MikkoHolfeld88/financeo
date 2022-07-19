import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import moment from "moment";

interface MonthPickerState {
    value: number;
}

const initialState: MonthPickerState = {
    value: moment().month() + 1
}

export const monthPickerSlice = createSlice({
    name: 'monthPicker',
    initialState,
    reducers: {
        changeMonth: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
    },
});

export const {changeMonth} = monthPickerSlice.actions;
export default monthPickerSlice.reducer;