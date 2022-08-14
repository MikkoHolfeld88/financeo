import store, {useAppDispatch, AppDispatch, RootState} from "./store"
import {setErrorMessage, setStatus, setUid, resetLogin} from "./slices/loginSlice";
import {changeMonth, resetMonthPicker} from "./slices/monthPickerSlice";
import {changeYear, resetYearPicker} from "./slices/yearPickerSlice";
import {addAccounts, addAccount, updateAccount, deleteAccount, resetAccounts} from "./slices/accountsSlice";
import {
    changePickedAccounts,
    resetAccountPicker,
    removePickedAccount,
    adjustPickedAccounts
} from "./slices/accountPickerSlice";
import {updatePanel, resetSubmenuAccounting} from "./slices/submenuAccountingSlice";
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
import {setAccountingData, resetAccountingData} from "./slices/accountingDataSlice";
import StateLoader from "./StateLoader";


export {
    store, StateLoader, useAppDispatch,
    setErrorMessage, setStatus, setUid, resetLogin,
    changeMonth, resetMonthPicker,
    changeYear, resetYearPicker,
    addAccount, addAccounts, updateAccount, deleteAccount, resetAccounts,
    changePickedAccounts, removePickedAccount, adjustPickedAccounts, resetAccountPicker,
    updatePanel, resetSubmenuAccounting,
    addCSVData, setCSVUploadError, setHead, mapData, setAccountName, resetCSVUploaderState,
    setNodes, addEdge, setEdges, resetEdges, setClickedNode, resetClickedNodePrev, resetCSVMapperState,
    setAccountingData, resetAccountingData
}

export type {
    AppDispatch,
    RootState,
    ICSVUploaderProps
}