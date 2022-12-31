import Grid from "@mui/material/Grid";
import React from "react";
import {Paper} from "@mui/material";
import {CategoryManagement} from "../../../components/account/categories/CategoryManagement";
import {CategoryList} from "../../../components/account/categories/CategoryList";
import CategoryTree from "../../../components/account/categories/CategoryTree";

interface ICategoriesProps {
    containerStyle?: React.CSSProperties;
}

const Categories = (props: ICategoriesProps) => {
    const containerStyle: React.CSSProperties = {
        minHeight: "25vh",
        overflow: "auto"
    }

    return (
        <Grid container spacing={2} style={{marginTop: "10px"}}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Paper style={containerStyle} elevation={0}>
                    <CategoryManagement containerStlye={containerStyle}/>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Paper style={containerStyle} elevation={0}>
                    <CategoryTree />
                </Paper>
            </Grid>
        </Grid>
    )
}

export type {ICategoriesProps}
export default Categories;
