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
        resetYearPicker: (state) => {
            state.value = moment().year();
            state.status = 'loaded';
        }
    },
});

export const {changeYear, resetYearPicker} = yearPickerSlice.actions;
export default yearPickerSlice.reducer;