import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {SCHEME1, SCHEME2} from "../../constants/colors";
import {Button, Fab, Grid, IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from "@mui/material/Box";
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

export function Account() {
    const handleChange = (e: any, setFn: any) => {
        setFn(e.target.value);
    };

    const [text, setText] = React.useState(
        'This is a controlled component'
    );

    return (
        <div style={{whiteSpace: 'nowrap'}}>
            <strong><label className="mr-2">Email Address: </label></strong>
            <EditText
                name="email"
                type="email"
                value={text}
                onChange={(e) => handleChange(e, setText)}
                style={{width: '200px'}}
                defaultValue="email@domain.com"
                inline/>
        </div>
    )
}

export function AddAccountButton() {
    return (
        <div>
            <Tooltip title={"Add new account or depot"}>
                <Button variant="outlined" startIcon={<AddIcon />}>
                    Add Account
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