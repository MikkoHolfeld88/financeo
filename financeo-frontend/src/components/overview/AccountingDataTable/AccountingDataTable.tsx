import React from 'react';
import {Container, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow} from "@mui/material";
import {AccountingData, AccountingDataValueType, RootState} from "../../../store";
import {useSelector} from "react-redux";
import { AccountingTableHead } from "./AccountingTableHead";
import TablePaginationActions from "./TablePaginationActionsFinanceo";
import * as COLOR from "../../../constants/colors";
import styles from "./styles.module.scss"

export interface ITableRowProps {
    accountName: string,
    date: string,
    amount: string,
    type: string,
    receiver: string,
    usage: string,
}

const filterTableByYearAndMonth = (table: ITableRowProps[], pickedMonth: number[], pickedYear: number): ITableRowProps[] => {
    let filteredTable: ITableRowProps[] = [];
    pickedMonth.forEach((month) => {
        const monthTable = table.filter((row) => {
            const date = new Date(row.date);
            return date.getMonth() === month - 1 && date.getFullYear() === pickedYear;
        })
        filteredTable = [...filteredTable, ...monthTable];
    })

    return filteredTable;
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

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

type Order = 'asc' | 'desc';

export function AccountingDataTable() {
    const pickedAccountIDs: string[] | string = useSelector((state: RootState) => state.accountPicker.ids);
    const accountingDataValues: AccountingDataValueType[] = useSelector((state: RootState) => state.accountingData.value);
    const pickedYear: number = useSelector((state: RootState) => state.yearPicker.value);
    const pickedMonth: number[] = useSelector((state: RootState) => state.monthPicker.value);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof ITableRowProps>('date');

    let tableRows = createTableRows();

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    function getNumberColors(amount: string): string {
        const transferedMoney = parseFloat(amount.replace(",", "."));

        if (transferedMoney > 0) {return COLOR.SCHEME.ACCOUNT_COLOR}
        if (transferedMoney < 0) {return COLOR.SCHEME.warn}

        return COLOR.SCHEME.textBasic;
    }

    const tableCellStyle = {
        fontSize: "13px",
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof ITableRowProps,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const formatDateString = (dateString: string): string => {
        return new Date (dateString).toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
    }

    return (
        <Container maxWidth="xl">
            <br/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <AccountingTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={tableRows ? tableRows.length : 0}
                        className={styles.accountTableHeader}/>
                    <TableBody>
                        {
                            tableRows !== null && stableSort(tableRows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.map((row: ITableRowProps, indexRow) => {
                                    return (
                                        <TableRow key={row.accountName + "_row_" + indexRow}>
                                            <TableCell sx={{fontSize: "13px", whiteSpace: "nowrap"}} variant="head" key={row.accountName + "_accountName_" +  indexRow}>{row.accountName}</TableCell>
                                            <TableCell sx={tableCellStyle} variant="footer" key={row.date + "_date_" + indexRow}>{formatDateString(row.date)}</TableCell>
                                            <TableCell sx={tableCellStyle} variant="footer" key={row.type + "_type_" + indexRow}>{row.type}</TableCell>
                                            <TableCell sx={tableCellStyle} variant="footer" key={row.usage + "_usage_" + indexRow}>{row.usage}</TableCell>
                                            <TableCell sx={tableCellStyle} variant="footer" key={row.receiver + "_receiver_" + indexRow}>{row.receiver}</TableCell>
                                            <TableCell align='right' sx={{color: getNumberColors(row.amount)}} variant="head" key={row.amount + "_amount_" + indexRow}>{row.amount}</TableCell>
                                        </TableRow>
                                )}
                            )
                        }
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 15, 25, 35, 50, 65, { label: 'All', value: -1 }]}
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
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
        </Container>
    );
}

export default AccountingDataTable;
