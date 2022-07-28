import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import moment from 'moment';

interface YearPickerState {
    value: number;
    status: 'idle' | 'pending' | 'loaded' | 'failed';
}

const initialState: YearPickerState = {
    value: moment().year(),
    status: 'loaded'
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