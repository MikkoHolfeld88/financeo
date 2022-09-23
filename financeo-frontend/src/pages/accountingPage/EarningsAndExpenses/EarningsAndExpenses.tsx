import React from 'react';
import {AccountingDataTable} from "../../../components/account/earningsAndExpenses/accountingDataTable/AccountingDataTable";
import {SelectHeader} from "../../../components/selectHeader/SelectHeader";

const EarningsAndExpenses = () => {
    return (
        <React.Fragment>
            <SelectHeader />
            <AccountingDataTable />
        </React.Fragment>
    )
}

export default EarningsAndExpenses;
