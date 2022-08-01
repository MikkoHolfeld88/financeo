import React from "react";
import {Grid, Tooltip} from "@mui/material";
import "./index.scss";
import AccountBalanceIconOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PersonIcon from '@mui/icons-material/Person';

export default function AccountHead() {
    return (
        <div style={{marginLeft: "15px"}}>
            <Grid container spacing={2} className={"accountHeadBackground"} alignItems="center" justifyItems="center">
                <Tooltip title="Number of Account entries made in this table" placement="bottom">
                    <Grid item md={1} lg={1} xl={1} className="accountHeadContent">
                        <FormatListNumberedIcon className="accountHead" fontSize="small"/>&nbsp;
                        <p className="accountHead">No</p>
                    </Grid>
                </Tooltip>
                <Tooltip title="Type of account / depot" placement="top">
                    <Grid item md={1} lg={1} xl={1} className="accountHeadContent">
                        <CategoryOutlinedIcon className="accountHead" fontSize="small"/>&nbsp;
                        <p className="accountHead">Type</p>
                    </Grid>
                </Tooltip>
                <Tooltip title="Name of the bank" placement="top">
                    <Grid item md={2} lg={2} xl={2} className="accountHeadContent">
                        <AccountBalanceIconOutlinedIcon className="accountHead" fontSize="small"/>&nbsp;
                        <p className="accountHead">Bank</p>
                    </Grid>
                </Tooltip>
                <Tooltip title="Iban number of account / depot" placement="top">
                    <Grid item md={3} lg={3} xl={3} className="accountHeadContent">
                        <CreditCardIcon className="accountHead" fontSize="small"/>&nbsp;
                        <p className="accountHead">IBAN</p>
                    </Grid>
                </Tooltip>
                <Tooltip title="SWIFT / BIC of Bank" placement="top">
                    <Grid item md={2} lg={2} xl={2} className="accountHeadContent">
                        <FingerprintIcon className="accountHead" fontSize="small"/>&nbsp;
                        <p className="accountHead">BIC / SWIFT</p>
                    </Grid>
                </Tooltip>
                <Tooltip title="Owner of account / depot" placement="top">
                    <Grid item md={2} lg={2} xl={2} className="accountHeadContent">
                        <PersonIcon className="accountHead" fontSize="small"/>&nbsp;
                        <p className="accountHead">Owner</p>
                    </Grid>
                </Tooltip>
                <Grid item md={1} lg={1} xl={1}></Grid>
            </Grid>
        </div>

    )
}