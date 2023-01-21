import store, {useAppDispatch, AppDispatch, RootState} from "./store"
import {setErrorMessage, setStatus, setUid, resetLogin} from "./slices/loginSlice";
import {changeMonth, resetMonthPicker} from "./slices/monthPickerSlice";
import {changeYear, resetYearPicker} from "./slices/yearPickerSlice";
import {addAccounts, addAccount, updateAccount, deleteAccount, resetAccounts, IAccountProps} from "./slices/accountsSlice";
import {
    changePickedAccounts,
    resetAccountPicker,
    removePickedAccount,
    adjustPickedAccounts,
    IAccountPickerProps
} from "./slices/accountPickerSlice";
import {
    addCSVData,
    setCSVUploadError,
    setHead,
    mapData,
    setAccountName,
    resetCSVUploaderState,
    ICSVUploaderProps
} from "./slices/CSVUploaderSlice";
import {
    setNodes,
    addEdge,
    setEdges,
    resetEdges,
    setClickedNode,
    resetClickedNodePrev,
    resetCSVMapperState
} from "./slices/CSVMapperSlice";
import {setAccountingData, resetAccountingData, AccountingDataValueType, AccountingDataType, AccountingData} from "./slices/accountingDataSlice";
import StateLoader from "./StateLoader";
import {setToolTipsEnabled, updatePanel, resetSubmenuAccounting,} from "./slices/appConfigSlice";


export {
    store, StateLoader, useAppDispatch,
    setErrorMessage, setStatus, setUid, resetLogin,
    changeMonth, resetMonthPicker,
    changeYear, resetYearPicker,
    addAccount, addAccounts, updateAccount, deleteAccount, resetAccounts,
    changePickedAccounts, removePickedAccount, adjustPickedAccounts, resetAccountPicker,
    updatePanel, resetSubmenuAccounting, setToolTipsEnabled,
    addCSVData, setCSVUploadError, setHead, mapData, setAccountName, resetCSVUploaderState,
    setNodes, addEdge, setEdges, resetEdges, setClickedNode, resetClickedNodePrev, resetCSVMapperState,
    setAccountingData, resetAccountingData,

}

export type {
    IAccountProps,
    AppDispatch,
    RootState,
    ICSVUploaderProps,
    AccountingDataValueType,
    AccountingDataType,
    AccountingData,
    IAccountPickerProps
}
