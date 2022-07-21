import React from "react";
import {Grid, Tooltip} from "@mui/material";
import TextEditFinanceo from "../utils/TextEditFinanceo";
import "./index.scss";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function AccountHead() {
    return (
        <Grid container spacing={2}>
            <Tooltip title="Number of Account entries made in this table">
                <Grid item md={1} lg={1} xl={1}>
                    <TextEditFinanceo
                        className="accountHead"
                        state="Index"
                        readonly={true}
                        name="AccountHeadCount"
                    />
                </Grid>
            </Tooltip>
            <Tooltip title="Type of account / depot">
                <Grid item md={1} lg={1} xl={1}>
                    <TextEditFinanceo
                        className="accountHead"
                        state="Type"
                        readonly={true}
                        name="AccountType"
                    />
                </Grid>
            </Tooltip>
            <Tooltip title="Name of the bank">
                <Grid item md={2} lg={2} xl={2}>
                    <TextEditFinanceo
                        className="accountHead"
                        state="Name (of bank)"
                        readonly={true}
                        name="NameOfBank"
                    />
                </Grid>
            </Tooltip>
            <Tooltip title="Iban number of account / depot">
                <Grid item md={3} lg={3} xl={3}>
                    <TextEditFinanceo
                        className="accountHead"
                        state="IBAN"
                        readonly={true}
                        name="IBANNumber"/>
                </Grid>
            </Tooltip>
            <Tooltip title="SWIFT / BIC of Bank">
                <Grid item md={2} lg={2} xl={2}>
                    <TextEditFinanceo
                        className="accountHead"
                        state="BIC / SWIFT"
                        readonly={true}
                        name="BIC/Swift"
                    />
                </Grid>
            </Tooltip>
            <Tooltip title="Owner of account / depot">
                <Grid item md={2} lg={2} xl={2}>
                    <TextEditFinanceo
                        className="accountHead"
                        state="Owner (of account)"
                        readonly={true}
                        name="Owner"
                    />
                </Grid>
            </Tooltip>
            <Grid item md={1} lg={1} xl={1}></Grid>
        </Grid>
    )
}