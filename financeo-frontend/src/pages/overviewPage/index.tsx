import React, {useEffect} from 'react';
import "./style.scss"
import {SelectHeader} from "../../components/selectHeader/SelectHeader";
import {STATUS, Status} from "../../types/general";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store";
import {fetchAccountingData} from "../../store/slices/accountingData/accountingDataSlice";
import {fetchAccounts} from "../../store/slices/accounts/accountsSlice";

const OverviewPage = () => {
    const dispatch = useAppDispatch();
    const uid: string = useSelector((state: RootState) => state.login.uid);
    const accountsStatus: Status = useSelector((state: RootState) => state.accounts.status);
    const accountingDataStatus: Status = useSelector((state: RootState) => state.accountingData.status);

    useEffect(() => {
        accountsStatus === STATUS.IDLE && dispatch(fetchAccounts(uid));
        accountingDataStatus === STATUS.IDLE && dispatch(fetchAccountingData(uid));
    }, []);

    return (
        <React.Fragment>
            <SelectHeader csvUploaderInvisible={true}/>
        </React.Fragment>
    )
};

export default OverviewPage;
