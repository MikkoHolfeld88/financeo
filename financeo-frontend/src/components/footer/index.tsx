import React from "react";
import {Grid, Typography} from "@mui/material";
import logo from "../../assets/logo/logo_white_large.png"
import "./index.css";
import SubscriptionForm from "./SubscriptionForm";

const Footer = () => {
    return (
        <footer>
            <Grid container justifyContent="center" alignItems="center" style={{maxWidth: '100%'}}>

                <Grid container item xs={12} justifyContent="space-around" spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <img src={logo} alt="financeo logo" className="footer-logo"/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <img src={logo} alt="financeo logo" className="footer-logo"/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <img src={logo} alt="financeo logo" className="footer-logo"/>
                    </Grid>
                </Grid>

                <Grid container item xs={12} justifyContent="space-around" spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Typography>Einfache Verwaltung deiner Finanzen</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>DENTAL MARKETING INSIGHTS FOR CLEVER DENTISTS DIRECT TO YOUR INBOX</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>

                    </Grid>
                </Grid>

                <Grid container item xs={12} justifyContent="space-around" spacing={2}>
                    <Grid item xs={12} sm={4}>
                        {/* Platz für weiteres Element */}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SubscriptionForm/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* Platz für weiteres Element */}
                    </Grid>
                </Grid>

            </Grid>
        </footer>
    )
}

export default Footer;
