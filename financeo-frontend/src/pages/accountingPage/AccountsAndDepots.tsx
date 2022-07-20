import React from 'react';
import {Button, Grid, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {EditText} from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import TextEditFinanceo from "../../components/utils/TextEditFinanceo";

export function Account() {
    const handleChange = (e: any, setFn: any) => {
        setFn(e.target.value);
    };

    const [text, setText] = React.useState(
        'This is a controlled component'
    );

    return (
        <React.Fragment>
            <Grid container className="account">
                <Grid item xl={2}>
                    <TextEditFinanceo
                        name="example"
                    />
                </Grid>
            </Grid>

        </React.Fragment>
    )
}

export function AddAccountButton() {
    return (
        <div>
            <Tooltip title={"Add new account or depot"} placement="right">
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
            <Account />
        </>

    )
}

export default AccountsAndDepots;