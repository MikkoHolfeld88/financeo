import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAccountProps} from "../../components/account/Account";

interface submenuAccountingSlice {
    panel: number;
    panelName?: string;
    status: 'idle' | 'pending' | 'loaded' | 'failed';
}

const initialState: submenuAccountingSlice = {
    panel: 0,
    panelName: "accountsAndDepots",
    status: 'loaded'
}

export const submenuAccountingSlice = createSlice({
    name: 'submenuAccounting',
    initialState,
    reducers: {
        updatePanel: (state, action: PayloadAction<number>) => {
            state.status = 'pending';
            state.panel = action.payload;
            switch (action.payload) {
                case 0: state.panelName = "accountsAndDepots"; break;
                case 1: state.panelName = "earningsAndExpenses"; break;
                case 2: state.panelName = "bankersOrders"; break;
                case 3: state.panelName = "savings"; break;
            }
            state.status = 'loaded';

        },
        resetSubmenuAccounting: (state) => {
            state.panel = 0;
            state.panelName = "accountsAndDepots";
            state.status = "idle";
        }
    },
});

export const {updatePanel, resetSubmenuAccounting} = submenuAccountingSlice.actions;
export default submenuAccountingSlice.reducer;