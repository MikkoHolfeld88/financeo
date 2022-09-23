import React from 'react';
import {AccountingDataTable} from "../../../components/overview/AccountingDataTable/AccountingDataTable";
import {SelectHeader} from "../../../components/overview/SelectHeader";

const EarningsAndExpenses = () => {
    return (
        <React.Fragment>
            <SelectHeader />

            <AccountingDataTable />
        </React.Fragment>

    )
}

export default EarningsAndExpenses;
