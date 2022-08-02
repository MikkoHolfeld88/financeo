import React, {useEffect} from "react";
import getData from "../services/databaseService/databaseService";
import {addAccounts} from "./slices/accountsSlice";
import {RootState, useAppDispatch} from "./store";
import {useSelector} from "react-redux";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../services/firebaseService/firebaseService";
import {setStatus, setUid} from "./slices/loginSlice";

export default function StateLoader(){
    const dispatch = useAppDispatch();
    const [user, loading] = useAuthState(auth);
    let uid = user?.uid ? user?.uid : 'none';
    let accountsStatus = useSelector((state: RootState) => state.accounts.status);

    function loadData(){
        loadAccountData();
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

    useEffect(() => {
        if (loading) {
            dispatch(setStatus('pending'));
            return;
        }

        if (user) {
            dispatch(setUid(user?.uid ? user?.uid : 'none'));
            loadData();
            return;
        }
    }, [user, loading]);

    return (<></>);

}