import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface MonthPickerState {
    value: number;
}

const initialState: MonthPickerState = {
    value: 1
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