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
            state.status = 'pending';
            state.value = action.payload;
            state.status = 'loaded';
        },
        resetYearPicker: (state) => {
            state.value = moment().year();
            state.status = 'idle';
        }
    },
});

export const {changeYear, resetYearPicker} = yearPickerSlice.actions;
export default yearPickerSlice.reducer;