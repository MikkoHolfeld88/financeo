import Grid from "@mui/material/Grid";
import React, {useEffect} from "react";
import {Paper} from "@mui/material";
import {CategoryManagement} from "../../../components/account/categories/CategoryManagement";
import CategoryTree from "../../../components/account/categories/CategoryTree";
import {AccountingCategory} from "../../../store/slices/accountingCategory/accountingCategorySlice";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {initialCategories} from "../../../store/slices/accountingCategory/initialCategories";
import {addAllData} from "../../../services/databaseService/databaseService";
import {FIRESTORE_COLLECTIONS} from "../../../services/databaseService/colletions";

const Categories = () => {
    const uid: string | 'none' = useSelector((state: RootState) => state.login.uid);
    const accountingCategories: AccountingCategory[] = useSelector((state: RootState) => state.accountingCategory.categories);

    const containerStyle: React.CSSProperties = {
        minHeight: "25vh",
        overflow: "auto"
    }

    useEffect(() => {
        console.log(accountingCategories);

        // removes initialCategories from accountingCategories
        const cleanedAccountingCategories = accountingCategories.filter(
            (accountingCategory) => !initialCategories.some(
                (initialCategory) => accountingCategory.id === initialCategory.id));

        console.log(cleanedAccountingCategories);

        addAllData(FIRESTORE_COLLECTIONS.CATEGORIES, uid, {categories: cleanedAccountingCategories});
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
