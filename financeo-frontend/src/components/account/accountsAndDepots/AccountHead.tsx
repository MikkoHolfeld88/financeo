import React from "react";
import {Grid} from "@mui/material";
import "../index.scss";
import AccountBalanceIconOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PersonIcon from '@mui/icons-material/Person';
import {TooltipFinanceo} from "../../utils/TooltipFinanceo";

export default function AccountHead() {
    return (
        <div style={{marginLeft: "8px"}}>
            <Grid container spacing={1} className={"accountHeadBackground"} alignItems="left" justifyItems="left">
                <TooltipFinanceo title="Number of Account entries made in this table" placement="bottom">
                    <Grid item md={1} lg={1} xl={1} className="accountHeadContentCenter">
                        <FormatListNumberedIcon className="accountHeadCenter" fontSize="small"/>&nbsp;
                        <p className="accountHead">No</p>
                    </Grid>
                </TooltipFinanceo>
                <TooltipFinanceo title="Type of account / depot" placement="top">
                    <Grid item md={1} lg={1} xl={1} className="accountHeadContent">
                        <CategoryOutlinedIcon className="accountHead" fontSize="small"/>&nbsp;
                        <p className="accountHead">Type</p>
                    </Grid>
                </TooltipFinanceo>
                <TooltipFinanceo title="Name of the bank" placement="top">
                    <Grid item md={2} lg={2} xl={2} className="accountHeadContent">
                        <AccountBalanceIconOutlinedIcon className="accountHead" fontSize="small"/>&nbsp;
                        <p className="accountHead">Bank</p>
                    </Grid>
                </TooltipFinanceo>
                <TooltipFinanceo title="Iban number of account / depot" placement="top">
                    <Grid item md={3} lg={3} xl={3} className="accountHeadContent">
                        <CreditCardIcon className="accountHead" fontSize="small"/>&nbsp;
                        <p className="accountHead">IBAN</p>
                    </Grid>
                </TooltipFinanceo>
                <TooltipFinanceo title="SWIFT / BIC of Bank" placement="top">
                    <Grid item md={2} lg={2} xl={2} className="accountHeadContent">
                        <FingerprintIcon className="accountHead" fontSize="small"/>&nbsp;
                        <p className="accountHead">BIC/Swift</p>
                    </Grid>
                </TooltipFinanceo>
                <TooltipFinanceo title="Owner of account / depot" placement="top">
                    <Grid item md={2} lg={2} xl={2} className="accountHeadContent" sx={{textAlign: "center"}}>
                        <PersonIcon className="accountHead" fontSize="small"/>&nbsp;
                        <p className="accountHead">Owner</p>
                    </Grid>
                </TooltipFinanceo>
                <Grid item md={1} lg={1} xl={1}></Grid>
            </Grid>
        </div>

    )
}
