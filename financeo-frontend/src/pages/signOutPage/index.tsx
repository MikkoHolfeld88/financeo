import React, {useEffect} from 'react';
import {useAppDispatch} from "../../store/store";
import {resetAccounts, resetLogin, resetMonthPicker, resetYearPicker} from "../../store";

const SignOutPage = () => {
    const dispatch = useAppDispatch();

    const resetStore = () => {
        dispatch(resetAccounts());
        dispatch(resetLogin());
        dispatch(resetMonthPicker());
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
