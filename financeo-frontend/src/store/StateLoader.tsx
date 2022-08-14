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

export default function StateLoader(){
    const dispatch = useAppDispatch();
    const [user, loading] = useAuthState(auth);
    let uid = user?.uid ? user?.uid : 'none';
    let accountsStatus = useSelector((state: RootState) => state.accounts.status);
    let accountPickerStatus = useSelector((state: RootState) => state.accountPicker.status);

    function loadAllStates(){
        loadAccountData();
        loadPickedAccountData();
        loadAccountingData();
        dispatch(setStatus('loaded'));
    }

    function loadAccountData(){
        if(accountsStatus === 'idle'){
            getData('accountsAndDepots', uid)
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
            getData('pickedAccounts', uid)
                .then((documentData) => {
                    dispatch(changePickedAccounts(documentData?.pickedAccounts));
                })
                .catch((error: any) => {
                    process.env.REACT_APP_RUN_MODE === 'DEVELOP' && console.log(error);
                    dispatch(changePickedAccounts([]));
                });
        }
    }

    function loadAccountingData(){
        if(accountsStatus === 'idle'){
            getData('accountingData', uid)
                .then((documentData: AccountingDataValueType | any) => {
                    const { uid, ...accountingData } = documentData;
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