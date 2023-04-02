import {Grid, Paper, Typography} from "@mui/material";
import React, { MouseEvent } from "react";
import {useSelector} from "react-redux";
import {
    AccountingCategory,
    setSelectedCategory
} from "../../../../store/slices/accountingCategory/accountingCategorySlice";
import "../categoryStyles.scss";
import {useAppDispatch} from "../../../../store";

const HEADLINE = "Category list";

export const CategoryList = () => {
    const dispatch = useAppDispatch();
    const categories: AccountingCategory[] = useSelector((state: any) => state.accountingCategory.categories);

    function handleClickOpen(categoryId: string | undefined) {
        if (categoryId) {
            dispatch(setSelectedCategory(categoryId));
        }
    }

    return (
        <React.Fragment>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography sx={{marginTop: "10px", textAlign: "center"}} variant="h6">{HEADLINE}</Typography>
            </Grid>
            <Grid container className="categoryListInnerContainer">
                {
                    categories.map((category: AccountingCategory, index: number) => {
                        return (
                            <Grid item key={index + "_categoryListGridItem"}>
                                <Paper
                                    elevation={1}
                                    id={category.default ? "categoryName" : "categoryNameDefault"}
                                    className="hvr-float">
                                    <Typography
                                        id={category.default ? "categoryNameText" : "categoryNameTextDefault"}
                                        onClick={() => handleClickOpen(category.id)}>
                                        {category.name}
                                    </Typography>
                                </Paper>

                            </Grid>
                        )
                    })
                }
            </Grid>
        </React.Fragment>
    )};
