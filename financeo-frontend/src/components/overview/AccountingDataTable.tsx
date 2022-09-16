import React from 'react';
import {Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {
    AccountingData,
    AccountingDataType,
    AccountingDataValueType,
    IAccountProps,
    RootState,
    useAppDispatch
} from "../../store";
import {useSelector} from "react-redux";
import * as COLOR from "../../constants/colors";
import {object} from "firebase-functions/lib/providers/storage";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {TableRowTypeMap} from "@mui/material/TableRow/TableRow";

export function AccountingDataTable() {
    const dispatch = useAppDispatch();
    const pickedAccounts: string[] | string = useSelector((state: RootState) => state.accountPicker.pickedAccounts);
    const pickedAccountIDs: string[] | string = useSelector((state: RootState) => state.accountPicker.ids);
    const accountingDataValues: AccountingDataValueType[] = useSelector((state: RootState) => state.accountingData.value);
    const accounts = useSelector((state: RootState) => state.accounts.data);

    function createTableRows(){
        if (typeof pickedAccountIDs !== "string") {
            pickedAccountIDs && pickedAccountIDs.map((accountID: string) => {
                console.log(accountingDataValues);
                console.log(accountID);
                // @ts-ignore
                console.log(accountingDataValues[accountID]);
                if(accountID in accountingDataValues){

                        // @ts-ignore
                        accountingDataValues[accountID].data.map((data: AccountingData) => {

                            return (
                                <TableRow
                                    // @ts-ignore
                                    key={accountingDataValues[accountID].accountName}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {/*// @ts-ignore*/}
                                        {accountingDataValues[accountID].accountName}
                                    </TableCell>
                                    <TableCell align="right">{data.date}</TableCell>
                                    <TableCell align="right">{data.type}</TableCell>
                                    <TableCell align="right">{data.amount}</TableCell>
                                    <TableCell align="right">{data.receiver}</TableCell>
                                    <TableCell align="right">{data.usage}</TableCell>
                                </TableRow>
                            )
                        })
                    } else {
                        return (
                            <TableRow></TableRow>
                        )
                    }

            })
        } else {
            accountingDataValues.forEach((accountingData: AccountingDataValueType) => {
                if(pickedAccountIDs in accountingData){
                    accountingData[pickedAccountIDs].data.map((data: AccountingData) => {
                        return (
                            <TableRow
                                key={accountingData[pickedAccountIDs].accountName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {accountingData[pickedAccountIDs].accountName}
                                </TableCell>
                                <TableCell align="right">{data.date}</TableCell>
                                <TableCell align="right">{data.type}</TableCell>
                                <TableCell align="right">{data.amount}</TableCell>
                                <TableCell align="right">{data.receiver}</TableCell>
                                <TableCell align="right">{data.usage}</TableCell>
                            </TableRow>
                        )
                    })
                }
            })
        }

        return (
            <TableRow></TableRow>
        )

    }

    return (
        <Container maxWidth="xl">
            <br/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{backgroundColor: COLOR.SCHEME.background}}>
                            <TableCell>Account</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Type&nbsp;</TableCell>
                            <TableCell align="right">Receiver&nbsp;</TableCell>
                            <TableCell align="right">Amount&nbsp;</TableCell>
                            <TableCell align="right">Usage&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {createTableRows()}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default AccountingDataTable;
