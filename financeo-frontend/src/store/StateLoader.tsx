import React, {useEffect} from "react";
import {RootState, useAppDispatch} from "./store";
import {useSelector} from "react-redux";
import {auth} from "../services/firebaseService/firebaseService";
import {useAuthState} from "react-firebase-hooks/auth";
import getData from "../services/databaseService/databaseService";
import {addAccounts} from "./slices/accounts/accountsSlice";
import {changePickedAccounts} from "./slices/accountPicker/accountPickerSlice";
import {setStatus, setUid} from "./slices/login/loginSlice";
import {AccountingDataValueType, setAccountingData} from "./slices/accountingData/accountingDataSlice";
import {FIRESTORE_COLLECTIONS} from "../services/databaseService/colletions";

export default function StateLoader() {
    const dispatch = useAppDispatch();
    const [user, loading] = useAuthState(auth);
    let uid = user?.uid ? user?.uid : 'none';
    const accountsStatus = useSelector((state: RootState) => state.accounts.status);
    const accountPickerStatus = useSelector((state: RootState) => state.accountPicker.status);
    const accountingCategoryStatus = useSelector((state: RootState) => state.accountingCategory.status);

    function loadAllStates() {
        loadAccountData();
        loadPickedAccountData();
        loadAccountingData();
        dispatch(setStatus('loaded'));
    }

    function loadAccountData() {
        if (accountsStatus === 'idle') {
            getData(FIRESTORE_COLLECTIONS.ACCOUNTS_AND_DEPOTS, uid)
                .then((documentData) => {
                    dispatch(addAccounts(documentData?.accounts));
                })
                .catch((error: any) => {
                    process.env.REACT_APP_RUN_MODE === 'DEVELOP' && console.log(error);
                });
        }
    }

    function loadPickedAccountData() {
        if (accountPickerStatus === 'idle') {
            getData(FIRESTORE_COLLECTIONS.PICKED_ACCOUNTS, uid)
                .then((documentData) => {
                    dispatch(changePickedAccounts({
                        pickedAccounts: documentData?.pickedAccounts,
                        ids: documentData?.ids
                    }));
                })
                .catch((error: any) => {
                    process.env.REACT_APP_RUN_MODE === 'DEVELOP' && console.log(error);
                    dispatch(changePickedAccounts({pickedAccounts: [], ids: []}));
                });
        }
    }

    function loadAccountingData() {
        if (accountsStatus === 'idle') {
            getData(FIRESTORE_COLLECTIONS.ACCOUNTING_DATA, uid)
                .then((documentData: AccountingDataValueType | any) => {
                    const {uid, ...accountingData} = documentData;
                    dispatch(setAccountingData(accountingData));
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
