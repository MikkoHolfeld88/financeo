import {Grid} from "@mui/material";
import "./style.scss";
import React, {useEffect, useState} from "react";
import {CategoryCreation} from "./CategoryCreation";
import {CategoryIconPicker} from "./CategoryIconPicker";

interface ICategoryManagementProps {
    containerStlye?: React.CSSProperties;
}

export const styles = {
    invisibleScrollbar: {
        overflowY: 'scroll',
        height: {xs: '300px'},
        '::-webkit-scrollbar': {
            width: '20px',
        },
        '::-webkit-scrollbar-button': {},
        '::-webkit-scrollbar-thumb': {},
        '::-webkit-scrollbar-thumb:hover': {},
        '::-webkit-scrollbar-track': {},
        '::-webkit-scrollbar-track-piece': {},
        '::-webkit-scrollbar-corner': {},
        '::-webkit-resizer': {},
    },
    iconSize: {fontSize: "30px"}
}

export const CategoryManagement = (props: ICategoryManagementProps) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={props?.containerStlye}>
                <CategoryCreation />
            </Grid>
        </Grid>
    )
};
