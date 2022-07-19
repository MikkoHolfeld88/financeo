import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import YearPickerSlice from "./yearPickerSlice";
import moment from 'moment';

interface YearPickerState {
    value: number;
}

const initialState: YearPickerState = {
    value: moment().year()
}

export const yearPickerSlice = createSlice({
    name: 'yearPicker',
    initialState,
    reducers: {
        changeYear: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
    },
});

export const {changeYear} = yearPickerSlice.actions;
export default yearPickerSlice.reducer;