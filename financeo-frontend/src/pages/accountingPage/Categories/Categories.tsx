import Grid from "@mui/material/Grid";
import React, {useEffect} from "react";
import {Paper} from "@mui/material";
import {CategoryManagement} from "../../../components/account/categories/CategoryManagement";
import CategoryTree from "../../../components/account/categories/CategoryTree";
import {
    AccountingCategory,
    postAccountingCategories
} from "../../../store/slices/accountingCategory/accountingCategorySlice";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store";

const Categories = () => {
    const dispatch = useAppDispatch();
    const uid: string | 'none' = useSelector((state: RootState) => state.login.uid);
    const accountingCategories: AccountingCategory[] | undefined = useSelector((state: RootState) => state.accountingCategory.categories);

    const containerStyle: React.CSSProperties = {
        minHeight: "25vh",
        overflow: "auto"
    }

    useEffect(() => {
        if (accountingCategories) {
            dispatch(postAccountingCategories({categories: accountingCategories, uid: uid}))
        }
    }, [accountingCategories]);

    return (
        <Grid container spacing={2} style={{marginTop: "10px"}}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Paper style={containerStyle} elevation={0}>
                    <CategoryManagement containerStlye={containerStyle}/>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Paper style={containerStyle} elevation={0}>
                    <CategoryTree/>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Categories;
