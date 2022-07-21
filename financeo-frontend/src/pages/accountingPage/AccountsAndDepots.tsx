import React from 'react';
import {Button, Divider, Stack, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import 'react-edit-text/dist/index.css';
import {Account, AccountHead} from "../../components/account";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function AddAccountButton() {
    return (
        <Box>
            <Tooltip title={"Add new account / depot"} placement="right">
                <Button variant="outlined" startIcon={<AddIcon />}>
                    Add
                </Button>
            </Tooltip>
        </Box>
    );
}

const AccountsAndDepots = () => {
    const theme = useTheme();
    const desktopScreenSize = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <React.Fragment>
            <h1>Accounts and Depots</h1>
            <AddAccountButton />
            <div style={{ marginTop: "5px"}}/>
            {
                desktopScreenSize &&
                <AccountHead />
            }
            {
                desktopScreenSize &&
                <Divider />
            }
            <Account
                id={1}
                type="Account"
                bank="Kreissparkasse Köln"
                iban="DE42370502991313017653"
                bic="COKSDE33"
                owner="Mikko Holfeld"
            />
        </React.Fragment>

    )
}

export default AccountsAndDepots;