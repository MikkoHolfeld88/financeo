import React, {useEffect} from "react";
import {RootState, useAppDispatch} from "./store";
import {useSelector} from "react-redux";
import {auth} from "../services/firebaseService/firebaseService";
import {useAuthState} from "react-firebase-hooks/auth";
import getData from "../services/databaseService/databaseService";
import {addAccounts} from "./slices/accountsSlice";
import {changePickedAccounts} from "./slices/accountPickerSlice";
import {setStatus, setUid} from "./slices/loginSlice";
import {AccountingDataValueType, setAccountingData} from "./slices/accountingDataSlice";
import {FIRESTORE_COLLECTIONS} from "../services/databaseService/colletions";
import {AccountingCategory, setAccountingCategories} from "./slices/accountingCategorySlice/accountingCategorySlice";
import {initialCategories} from "./slices/accountingCategorySlice/initialCategories";

export default function StateLoader(){
    const dispatch = useAppDispatch();
    const [user, loading] = useAuthState(auth);
    let uid = user?.uid ? user?.uid : 'none';
    const accountsStatus = useSelector((state: RootState) => state.accounts.status);
    const accountPickerStatus = useSelector((state: RootState) => state.accountPicker.status);
    const accountingCategoryStatus = useSelector((state: RootState) => state.accountingCategory.status);

    function loadAllStates(){
        loadAccountData();
        loadPickedAccountData();
        loadAccountingData();
        loadAccountingCategories();
        dispatch(setStatus('loaded'));
    }

    function loadAccountData(){
        if(accountsStatus === 'idle'){
            getData(FIRESTORE_COLLECTIONS.ACCOUNTS_AND_DEPOTS, uid)
                .then((documentData) => {
                    dispatch(addAccounts(documentData?.accounts));
                })
                .catch((error: any) => {
                    process.env.REACT_APP_RUN_MODE === 'DEVELOP' && console.log(error);
                });
        }
    }

    function loadPickedAccountData(){
        if(accountPickerStatus === 'idle'){
            getData(FIRESTORE_COLLECTIONS.PICKED_ACCOUNTS, uid)
                .then((documentData) => {
                    dispatch(changePickedAccounts({pickedAccounts: documentData?.pickedAccounts, ids: documentData?.ids}));
                })
                .catch((error: any) => {
                    process.env.REACT_APP_RUN_MODE === 'DEVELOP' && console.log(error);
                    dispatch(changePickedAccounts({pickedAccounts: [], ids: []}));
                });
        }
    }

    function loadAccountingData(){
        if(accountsStatus === 'idle'){
            getData(FIRESTORE_COLLECTIONS.ACCOUNTING_DATA, uid)
                .then((documentData: AccountingDataValueType | any) => {
                    const { uid, ...accountingData } = documentData;
                    dispatch(setAccountingData(accountingData));
                })
                .catch((error: any) => {
                    process.env.REACT_APP_RUN_MODE === 'DEVELOP' && console.log(error);
                });
        }
    }

    function loadAccountingCategories(){
        if(accountingCategoryStatus === 'idle'){
            getData(FIRESTORE_COLLECTIONS.CATEGORIES, uid)
                .then((documentData: AccountingCategory[] | any) => {
                    if (documentData) {
                        const { uid, ...accountingCategories } = documentData;
                        dispatch(setAccountingCategories(accountingCategories));
                    } else {
                        dispatch(setAccountingCategories(initialCategories));
                    }
                })
                .catch((error: any) => {
                    process.env.REACT_APP_RUN_MODE === 'DEVELOP' && console.log(error);
                });
        }
    }

    useEffect(() => {
        if (loading) {
            dispatch(setStatus('pending'));
            return;
        }

        if (user) {
            dispatch(setUid(user?.uid ? user?.uid : 'none'));
            loadAllStates();
            return;
        }
    }, [user, loading]);

    return (<></>);

}
