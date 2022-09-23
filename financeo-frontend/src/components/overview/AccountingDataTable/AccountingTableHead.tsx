import {TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
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
    description: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'accountName',
        numeric: false,
        disablePadding: true,
        label: 'NAME',
        description: 'Name of the bank where the account is located',
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'DATE',
        description: 'Date of the transaction',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'TYPE',
        description: 'Type of the transaction',
    },
    {
        id: 'usage',
        numeric: false,
        disablePadding: false,
        label: 'USAGE',
        description: 'Description to clarify transaction usage',
    },
    {
        id: 'receiver',
        numeric: false,
        disablePadding: false,
        label: 'RECEIVER',
        description: 'Person or company that received the money',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'AMOUNT',
        description: 'Amount of transaction',
    },
];

type Order = 'asc' | 'desc';

export interface IAccountingTableHeadProps {
    numSelected?: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ITableRowProps) => void;
    onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    className?: string;
}

export const AccountingTableHead: React.FC<IAccountingTableHeadProps> = props => {

    const createSortHandler = (property: keyof ITableRowProps) => (event: React.MouseEvent<unknown>) => {
        props.onRequestSort(event, property);
    };

    const tableCellStyle = {color: "white", fontSize: "13px", fontWeight: "bold", marginLeft: "10px"};

    const getCellAlign = (cellId: string): string | undefined => {
        switch (cellId) {
            case "accountName":
                return "center";
            case "amount":
                return "right";
            default:
                return "left";
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
                            sortDirection={props.orderBy === headCell.id && props.order}>
                            <Tooltip title={headCell.description} placement="top">
                                <TableSortLabel
                                    active={props.orderBy === headCell.id}
                                    direction={props.orderBy === headCell.id && props.order || 'asc'}
                                    onClick={createSortHandler(headCell.id)}>
                                    {headCell.label}
                                    {
                                        props.orderBy === headCell.id &&
                                        <Box sx={visuallyHidden}>
                                            {props.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    }
                                </TableSortLabel>
                            </Tooltip>
                        </TableCell>
                    )
                }
            </TableRow>
        </TableHead>
    );
}
