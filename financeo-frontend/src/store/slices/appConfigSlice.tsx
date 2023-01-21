import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ISubmenuAccountingProps {
    panel: number;
    panelName?: string;
    status: 'idle' | 'pending' | 'loaded' | 'failed';
}

export interface AppConfigState {
    toolTipsEnabled: boolean;
    accountingPanel: ISubmenuAccountingProps;
}

const initialState: AppConfigState = {
    toolTipsEnabled: true,
    accountingPanel: {
        panel: 0,
        panelName: "accountsAndDepots",
        status: 'loaded'
    }
}

export const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState,
    reducers: {
        setToolTipsEnabled: (state, action: PayloadAction<boolean>) => {
            state.toolTipsEnabled = action.payload;
        },
        updatePanel: (state, action: PayloadAction<number>) => {
            state.accountingPanel.status = 'pending';
            state.accountingPanel.panel = action.payload;
            switch (action.payload) {
                case 0: state.accountingPanel.panelName = "accountsAndDepots"; break;
                case 1: state.accountingPanel.panelName = "earningsAndExpenses"; break;
                case 2: state.accountingPanel.panelName = "bankersOrders"; break;
                case 3: state.accountingPanel.panelName = "savings"; break;
            }
            state.accountingPanel.status = 'loaded';

        },
        resetSubmenuAccounting: (state) => {
            state.accountingPanel.panel = 0;
            state.accountingPanel.panelName = "accountsAndDepots";
            state.accountingPanel.status = "idle";
        }
    },
});

export const {setToolTipsEnabled, updatePanel, resetSubmenuAccounting} = appConfigSlice.actions;
export default appConfigSlice.reducer;
