import {TableCell, TableHead, TableRow} from "@mui/material";
import * as COLOR from "../../../constants/colors";
import * as React from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {ITableRowProps} from "./AccountingDataTable";
import * as StyleHelper from "../../../styleHelper";

interface HeadCell {
    disablePadding: boolean;
    id: keyof ITableRowProps;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'accountName',
        numeric: false,
        disablePadding: true,
        label: 'NAME',
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'DATE',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'TYPE',
    },
    {
        id: 'usage',
        numeric: false,
        disablePadding: false,
        label: 'USAGE',
    },
    {
        id: 'receiver',
        numeric: false,
        disablePadding: false,
        label: 'RECEIVER',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'AMOUNT',
    },
];

type Order = 'asc' | 'desc';

interface IAccountingTableHeadProps {
    numSelected?: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ITableRowProps) => void;
    onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    className?: string;
}

const AccountingTableHead = (props: IAccountingTableHeadProps) => {
    const {order, orderBy, onRequestSort} = props;

    const createSortHandler = (property: keyof ITableRowProps) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    const tableCellStyle = {color: "white", fontSize: "13px", fontWeight: "bold", marginLeft: "10px"};

    const getCellAlign = (cellId: string): string | undefined => {
        switch (cellId) {
            case "accountName":
                return "center";
            case "amount":
                return "right";
            default:
                return undefined;
        }
    }

    return (
        <TableHead className={props.className}>
            <TableRow>
                {
                    headCells.map(headCell =>
                        <TableCell
                            sx={tableCellStyle}
                            key={headCell.id}
                            className={[
                                StyleHelper.textAlign(getCellAlign(headCell.id)),
                                StyleHelper.noPadding(headCell.disablePadding)
                            ].filter(Boolean).join(' ')}
                            sortDirection={orderBy === headCell.id ? order : false}>
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}>
                                {headCell.label}
                                {
                                    orderBy === headCell.id &&
                                    <Box sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                }
                            </TableSortLabel>
                        </TableCell>
                    )
                }
            </TableRow>
        </TableHead>
    );
}

export type {IAccountingTableHeadProps}
export default AccountingTableHead;
