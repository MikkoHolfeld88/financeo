import {TableCell, TableHead, TableRow} from "@mui/material";
import * as COLOR from "../../../constants/colors";



interface IAccountingTableHeadProps {

}

const AccountingTableHead = (props: IAccountingTableHeadProps) => {
    const tableCellStyle = {color: "white", fontSize: "13px", fontWeight: "bold"};

    return (
        <TableHead>
            <TableRow sx={{backgroundColor: COLOR.SCHEME.mainBackground}}>
                <TableCell sx={tableCellStyle}>ACCOUNT</TableCell>
                <TableCell sx={tableCellStyle}>DATE</TableCell>
                <TableCell sx={tableCellStyle}>TYPE</TableCell>
                <TableCell sx={tableCellStyle}>USAGE</TableCell>
                <TableCell sx={tableCellStyle}>RECEIVER</TableCell>
                <TableCell align='right' sx={tableCellStyle}>AMOUNT</TableCell>
            </TableRow>
        </TableHead>
    )
}

export type {IAccountingTableHeadProps}
export default AccountingTableHead;
