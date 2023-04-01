import {Grid} from "@mui/material";
import "./style.scss";
import React from "react";
import {CategoryCreation} from "./categoryCreation/CategoryCreation";
import {CategoryList} from "./CategoryList";

interface ICategoryManagementProps {
    containerStlye?: React.CSSProperties;
}

export const CategoryManagement = (props: ICategoryManagementProps) => {
    return (
        <Grid container id="categoryManagement_container">
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} id="categoryCreation_container">
                <CategoryCreation/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} id="categoryList_container">
                <CategoryList />
            </Grid>
        </Grid>
    )
};
