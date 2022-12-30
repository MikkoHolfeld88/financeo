import {Grid, Button, Typography} from "@mui/material";
import "./style.scss";
import {useSelector} from "react-redux";
import {Category} from "./Category";

export const CategoryList = () => {
    const categoryState = useSelector((state: any) => state.accountingCategory);

    function handleClickOpen() {
        console.log("handleClickOpen")
    }

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {
                    categoryState.categories.map((category: any) => {
                        <Category
                            category={category}
                            selected={categoryState.selected.id === category.id}/>
                    })
                }
            </Grid>
        </Grid>
    )
};
