import React from "react";
import {Alert, Grid, Paper, Tooltip} from "@mui/material";
import TextEditFinanceo from "../utils/TextEditFinanceo";
import "./index.scss";
const ibantools = require('ibantools');

interface IAccountProps {
    count: number,
    type: "Account" | "Depot",
    bank?: string,
    iban: string,
    bic: string,
    owner?: string
}

export function Account(props: IAccountProps) {
    const handleChange = (e: any, setFn: any) => {
        setFn(e.target.value);
    };

    const [text, setText] = React.useState(
        'This is a controlled component'
    );

    const [visibleSnackbar, setSnackbarVisibility] = React.useState(
        false
    )

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setSnackbarVisibility(false);
    };

    const ibanValidation = {
        function: ibantools.isValidIBAN,
        message: "IBAN is not valid!"
    }

    const BICValidation = {
        function: ibantools.isValidBIC,
        message: "BIC is not valid!"
    }

    const ibanDisplayFunction = (iban: string) => {
        return iban.replace(/[a-zA-Z0-9_]{4}(?=.)/g, '$& ')
    }

    return (
        <Paper>
            <Grid container className="account">
                <Tooltip title="Count of account entries">
                    <Grid item xl={1}>
                        <TextEditFinanceo
                            className="accountCount"
                            state={props.count}
                            readonly={true}
                            name="AccountCount"
                        />
                    </Grid>
                </Tooltip>
                <Tooltip title="Type of account / depot">
                    <Grid item xl={3}>
                            <TextEditFinanceo
                                state={props.type}
                                readonly={true}
                                name="AccountType"
                            />
                    </Grid>
                </Tooltip>
                <Tooltip title="Name of the bank">
                    <Grid item xl={2}>
                        <TextEditFinanceo
                            state={props.bank}
                            name="NameOfBank"
                        />
                    </Grid>
                </Tooltip>
                <Tooltip title="Iban number of account / depot">
                    <Grid item xl={2}>
                        <TextEditFinanceo
                            state={props.iban}
                            name="IBANNumber"
                            validation={ibanValidation}
                            formatDisplayFunction={ibanDisplayFunction}
                        />
                    </Grid>
                </Tooltip>
                <Tooltip title="SWIFT / BIC of Bank">
                    <Grid item xl={2}>
                        <TextEditFinanceo
                            state={props.bic}
                            name="BIC/Swift"
                            validation={BICValidation}
                        />
                    </Grid>
                </Tooltip>
                <Tooltip title="Owner of account / depot">
                    <Grid item xl={2}>
                        <TextEditFinanceo
                            state={props.owner}
                            name="Owner"
                        />
                    </Grid>
                </Tooltip>
            </Grid>
        </Paper>
    )
}