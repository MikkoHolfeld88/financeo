import Grid from "@mui/material/Grid";
import React from "react";
import {Typography} from "@mui/material";

interface ICategoriesProps {
    value?: any,
}

const Categories = (props: ICategoriesProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>xs=8</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>xs=4</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>xs=4</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>xs=8</Typography>
            </Grid>
        </Grid>
    )
}

export type {ICategoriesProps}
export default Categories;
