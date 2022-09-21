import React, {useEffect} from 'react';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import {AccountingData, AccountingDataValueType, RootState} from "../../../store";
import {useSelector} from "react-redux";
import * as COLOR from "../../../constants/colors";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

interface ITableRowProps {
    accountName: string,
    date: string,
    amount: string,
    type: string,
    receiver: string,
    usage: string,
}

const filterTableByYearAndMonth = (table: ITableRowProps[], pickedMonth: number, pickedYear: number): ITableRowProps[] => {
    return table.filter((row) => {
        const date = new Date(row.date);
        return date.getFullYear() === pickedYear && date.getMonth() === pickedMonth - 1;
    })
}

const sortTableByDate = (table: ITableRowProps[]): ITableRowProps[] => {
    const filteredTable = table.filter((row) => row.date !== "" && row.date !== undefined && row.date !== null);

    const sortedTable = filteredTable.sort(function(a,b){
        const startDate = new Date(a.date);
        const endDate = new Date(b.date);
        return Number(endDate) - Number(startDate);
    });

    return sortedTable;
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
    const pickedYear: number = useSelector((state: RootState) => state.yearPicker.value);
    const pickedMonth: number = useSelector((state: RootState) => state.monthPicker.value);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    let tableRows = createTableRows();

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (tableRows ? tableRows?.length : 0)) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
        const sortedTable = mergedTables ? sortTableByDate(mergedTables) : null;
        const filteredTable = sortedTable ? filterTableByYearAndMonth(sortedTable, pickedMonth, pickedYear) : null;

        return filteredTable;
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
                            <TableCell align="right">Usage&nbsp;</TableCell>
                            <TableCell align="right">Receiver&nbsp;</TableCell>
                            <TableCell align="right">Amount&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                                count={tableRows ? tableRows?.length : 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {'aria-label': 'rows per page'},
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}/>
                        </TableRow>
                        {
                            (rowsPerPage > 0
                                    ? tableRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : tableRows
                            )?.map((row: ITableRowProps, indexRow) => {
                                    return (
                                        <TableRow
                                            key={row.accountName + "_name_" + indexRow}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row.accountName}</TableCell>
                                            <TableCell key={row.date + "_date_" + indexRow} align="right">{new Date (row.date).toLocaleDateString()}</TableCell>
                                            <TableCell key={row.type + "_type_" + indexRow} align="right">{row.type}</TableCell>
                                            <TableCell key={row.usage + "_usage_" + indexRow} align="right">{row.usage}</TableCell>
                                            <TableCell key={row.receiver + "_receiver_" + indexRow} align="right">{row.receiver}</TableCell>
                                            <TableCell key={row.amount + "_amount_" + indexRow} align="right">{row.amount}</TableCell>
                                        </TableRow>
                                    )})
                        }
                        {
                            emptyRows > 0 && (<TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
        </Container>
    );
}

export default AccountingDataTable;
