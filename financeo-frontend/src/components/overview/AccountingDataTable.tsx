import React, {useEffect} from 'react';
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

interface ITableRowProps {
    accountName: string,
    date: string,
    amount: string,
    type: string,
    receiver: string,
    usage: string,
}

export function AccountingDataTable() {
    const pickedAccountIDs: string[] | string = useSelector((state: RootState) => state.accountPicker.ids);
    const accountingDataValues: AccountingDataValueType[] = useSelector((state: RootState) => state.accountingData.value);

    function createTableRows(): ITableRowProps[][] | null {
        let tableRows: ITableRowProps[][] | null = null;

        if (typeof pickedAccountIDs !== "string") {
            tableRows = pickedAccountIDs && pickedAccountIDs.map((accountID: string) => {
                if(accountID in accountingDataValues){
                    return accountingDataValues[accountID].data.map((data: AccountingData) => {
                        return {
                            accountName: accountingDataValues[accountID].accountName,
                            date: data.date,
                            amount: data.amount,
                            type: data.type,
                            receiver: data.receiver,
                            usage: data.usage
                        }
                    })
                }
            })
        }

        return tableRows;
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
                        {
                            createTableRows()?.map((table: ITableRowProps[], indexTable) => {
                                return table?.reverse()?.map((row: ITableRowProps, indexRow) => {
                                    return row.date !== undefined && row.date !== "" && (
                                        <TableRow
                                            key={row.accountName + "_name_" + indexRow + indexTable}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row.accountName}</TableCell>
                                            <TableCell key={row.date + "_date_" + indexRow + indexTable} align="right">{row.date}</TableCell>
                                            <TableCell key={row.type + "_type_" + indexRow + indexTable} align="right">{row.type}</TableCell>
                                            <TableCell key={row.receiver + "_receiver_" + indexRow + indexTable} align="right">{row.receiver}</TableCell>
                                            <TableCell key={row.amount + "_amount_" + indexRow + indexTable} align="right">{row.amount}</TableCell>
                                            <TableCell key={row.usage + "_usage_" + indexRow + indexTable} align="right">{row.usage}</TableCell>
                                        </TableRow>
                                    )
                                })})
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default AccountingDataTable;
