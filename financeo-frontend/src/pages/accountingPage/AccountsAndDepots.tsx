import React from 'react';
import {Button, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import 'react-edit-text/dist/index.css';
import {Account} from "../../components/account/Account";

export function AddAccountButton() {
    return (
        <div>
            <Tooltip title={"Add new account / depot"} placement="right">
                <Button variant="outlined" startIcon={<AddIcon />}>
                    Add
                </Button>
            </Tooltip>
        </div>
    );
}

const AccountsAndDepots = () => {
    return (
        <>
            <h1>Accounts and Depots</h1>
            <AddAccountButton />
            <Account
                count={1}
                type="Account"
                bank="Kreissparkasse Köln"
                iban="test"
                bic="COKSDE33"
                owner="Mikko Holfeld"
            />
        </>

    )
}

export default AccountsAndDepots;