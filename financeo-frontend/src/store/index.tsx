import store, {useAppDispatch, AppDispatch, RootState} from "./store"
import {setErrorMessage, setStatus, setUid, resetLogin} from "./slices/login/loginSlice";
import {changeMonth, resetMonthPicker} from "./slices/monthPicker/monthPickerSlice";
import {changeYear, resetYearPicker} from "./slices/yearPicker/yearPickerSlice";
import {addAccounts, addAccount, updateAccount, deleteAccount, resetAccounts, IAccountProps} from "./slices/accounts/accountsSlice";
import {changePickedAccounts, resetAccountPicker, removePickedAccount, adjustPickedAccounts, IAccountPickerProps} from "./slices/accountPicker/accountPickerSlice";
import {addCSVData, setCSVUploadError, setHead, mapData, setAccountName, resetCSVUploaderState, ICSVUploaderProps} from "./slices/csvUploader/CSVUploaderSlice";
import {setNodes, addEdge, setEdges, resetEdges, setClickedNode, resetClickedNodePrev, resetCSVMapperState} from "./slices/csvMapper/CSVMapperSlice";
import {setAccountingData, resetAccountingData, AccountingDataValueType, AccountingDataType, AccountingData} from "./slices/accountingData/accountingDataSlice";
import StateLoader from "./StateLoader";
import {setToolTipsEnabled, updatePanel, resetSubmenuAccounting,} from "./slices/appConfig/appConfigSlice";
import {setAccountingCategories, addAccountingCategory, removeAccountingCategory, setSelectedCategory, resetAccountingCategory, addMatcher, removeMatcher, addParent, removeParent, changeIcon, changeDescription, changeName} from "./slices/accountingCategory/accountingCategorySlice";

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
    setAccountingCategories, addAccountingCategory, setSelectedCategory, removeAccountingCategory, changeName, changeIcon, changeDescription, addMatcher, removeMatcher, addParent, removeParent, resetAccountingCategory
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
