import React from 'react';
import {Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AccountingDataType, AccountingDataValueType, IAccountProps, RootState, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";
import * as COLOR from "../../constants/colors";




export function AccountingDataTable() {
    const dispatch = useAppDispatch();
    const pickedAccounts: string[] | string = useSelector((state: RootState) => state.accountPicker.pickedAccounts);
    const pickedAccountIDs: string[] | string = useSelector((state: RootState) => state.accountPicker.ids);
    const accountingData: AccountingDataValueType[] = useSelector((state: RootState) => state.accountingData.value);
    const accounts = useSelector((state: RootState) => state.accounts.data);

    function createAccountData(){
        // typeof pickedAccounts === "object" && pickedAccountIDs.forEach((account) => {
        //
        // })
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
                        {/*{createTableRows().map((row: any) => (*/}
                        {/*    <TableRow*/}
                        {/*        key={row.name}*/}
                        {/*        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>*/}
                        {/*        <TableCell component="th" scope="row">*/}
                        {/*            {row.name}*/}
                        {/*        </TableCell>*/}
                        {/*        <TableCell align="right">{row.date}</TableCell>*/}
                        {/*        <TableCell align="right">{row.type}</TableCell>*/}
                        {/*        <TableCell align="right">{row.amount}</TableCell>*/}
                        {/*        <TableCell align="right">{row.receiver}</TableCell>*/}
                        {/*        <TableCell align="right">{row.usage}</TableCell>*/}
                        {/*    </TableRow>*/}
                        {/*))}*/}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default AccountingDataTable;
