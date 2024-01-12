import React from "react";
import {Card, CardMedia, Grid} from "@mui/material";
import LandingNav from "../../components/navigation/LandingNav";
import landing from "../../assets/img/landing.png"

function LandingPage() {
    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <LandingNav />
            </Grid>
            <Grid item>
                <Card elevation={0} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CardMedia
                        component="img"
                        alt="Landing Page Main"
                        height="400"
                        style={{ maxWidth: "1000px" }}
                        image={landing}/>
                </Card>
            </Grid>

        </Grid>
    )
}

export default LandingPage;
