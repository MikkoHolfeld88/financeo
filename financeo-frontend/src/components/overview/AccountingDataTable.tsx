import React from 'react';
import {Container} from "@mui/material";
import {RootState, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";



export function AccountingDataTable() {
    const dispatch = useAppDispatch();
    const pickedAccountStatus: string = useSelector((state: RootState) => state.accountPicker.status);
    const accountingData = useSelector((state: RootState) => state.accountingData.value);

    return (
        <Container>
            {

            }
        </Container>
    );
}

export default AccountingDataTable;
