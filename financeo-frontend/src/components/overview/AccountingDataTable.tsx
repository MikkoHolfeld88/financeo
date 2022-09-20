import React from 'react';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {AccountingData, AccountingDataValueType, RootState} from "../../store";
import {useSelector} from "react-redux";
import * as COLOR from "../../constants/colors";
import moment from "moment/moment";

interface ITableRowProps {
    accountName: string,
    date: string,
    amount: string,
    type: string,
    receiver: string,
    usage: string,
}

const mergeTables = (tableRows: ITableRowProps[][] | null): ITableRowProps[] => {
    let mergedTableRows: ITableRowProps[] = [];

    tableRows?.forEach((tableRow: ITableRowProps[]) => {
        if(tableRow !== null ){ mergedTableRows =  [...mergedTableRows, ...tableRow]; }
    });

    return mergedTableRows;
}


export function AccountingDataTable() {
    const pickedAccountIDs: string[] | string = useSelector((state: RootState) => state.accountPicker.ids);
    const accountingDataValues: AccountingDataValueType[] = useSelector((state: RootState) => state.accountingData.value);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const tableRows = createTableRows();

    function createTableRows(): ITableRowProps[] | null {
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
                } else {
                    return null;
                }
            })
        }

        const mergedTables = tableRows ? mergeTables(tableRows) : null;

        console.log(mergedTables);

        return mergedTables;
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
                            tableRows?.map((row: ITableRowProps, indexRow) => {
                                    return (
                                        <TableRow
                                            key={row.accountName + "_name_" + indexRow}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row.accountName}</TableCell>
                                            <TableCell key={row.date + "_date_" + indexRow} align="right">{row.date}</TableCell>
                                            <TableCell key={row.type + "_type_" + indexRow} align="right">{row.type}</TableCell>
                                            <TableCell key={row.receiver + "_receiver_" + indexRow} align="right">{row.receiver}</TableCell>
                                            <TableCell key={row.amount + "_amount_" + indexRow} align="right">{row.amount}</TableCell>
                                            <TableCell key={row.usage + "_usage_" + indexRow} align="right">{row.usage}</TableCell>
                                        </TableRow>
                                    )})}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={tableRows ? tableRows.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
    );
}

export default AccountingDataTable;
