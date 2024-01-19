import React from "react";
import {Grid, Typography} from "@mui/material";
import logo from "../../assets/logo/logo_white_large.png"
import "./index.css";
import SubscriptionForm from "./SubscriptionForm";

const Footer = () => {
    return (
        <footer>
            <Grid container justifyContent="space-around" alignItems="center" style={{maxWidth: '100%'}}>
                <Grid container xs={12} justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <img src={logo} alt="financeo logo" className="footer-logo"/>
                    </Grid>
                    <Grid item xs={12} sm={4}>

                    </Grid>
                    <Grid item xs={12} sm={4}>

                    </Grid>
                </Grid>

                <Grid container xs={12} justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Typography>Spielerische Finanzverwaltung</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>
                            Updates zu Entwicklung und Status von financeo
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={4}>

                    </Grid>
                </Grid>

                <Grid container xs={12} justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={4} justifyContent="center" alignItems="center">

                    </Grid>
                    <Grid item xs={12} sm={4} className="footer-cell">
                        <SubscriptionForm/>
                    </Grid>
                    <Grid item xs={12} sm={4}>

                    </Grid>
                </Grid>

            </Grid>
        </footer>
    )
}

export default Footer;
