import React, {useEffect} from 'react';
import {useAppDispatch} from "../../store/store";
import {
    resetAccountingData,
    resetAccountPicker,
    resetAccounts, resetCSVMapperState, resetCSVUploaderState,
    resetLogin,
    resetMonthPicker,
    resetSubmenuAccounting,
    resetYearPicker
} from "../../store";

const SignOutPage = () => {
    const dispatch = useAppDispatch();

    const resetStore = () => {
        dispatch(resetAccountingData())
        dispatch(resetAccountPicker())
        dispatch(resetAccounts());
        dispatch(resetCSVMapperState())
        dispatch(resetCSVUploaderState())
        dispatch(resetLogin());
        dispatch(resetMonthPicker());
        dispatch(resetSubmenuAccounting())
        dispatch(resetYearPicker());
    }

    useEffect(() => {
        resetStore()
    }, []);

    return (
        <h1>SignOutPage</h1>
    );
}

export default SignOutPage;
