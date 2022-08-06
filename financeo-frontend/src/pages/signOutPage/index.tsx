import React, {useEffect} from 'react';
import {useAppDispatch} from "../../store/store";
import {
    resetAccountPicker,
    resetAccounts, resetCSVUploaderState,
    resetLogin,
    resetMonthPicker,
    resetSubmenuAccounting,
    resetYearPicker
} from "../../store";

const SignOutPage = () => {
    const dispatch = useAppDispatch();

    const resetStore = () => {
        dispatch(resetLogin());
        dispatch(resetMonthPicker());
        dispatch(resetYearPicker());
        dispatch(resetAccounts());
        dispatch(resetAccountPicker())
        dispatch(resetSubmenuAccounting())
        dispatch(resetCSVUploaderState())
    }

    useEffect(() => {
        resetStore()
    }, []);

    return (
        <h1>SignOutPage</h1>
    );
}


export default SignOutPage;
