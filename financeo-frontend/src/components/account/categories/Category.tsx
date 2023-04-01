import {Grid, Typography} from "@mui/material";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import {AccountingCategory} from "../../../store/slices/accountingCategory/accountingCategorySlice";

interface ICategoryProps {
    category: AccountingCategory;
    selected: boolean;
}

export const Category = (props: ICategoryProps) => {
    const onSelect = () => {
        console.log("onSelect")
    };

    return (
        <Grid container spacing={2} direction="row" justifyContent="flex-start"
              sx={{cursor: "pointer", margin: "10px"}}>
            <div
                id={props.category.id}
                className="categoryRow hvr-underline-from-left"
                onClick={onSelect}>
                <CategoryOutlinedIcon className="icon" fontSize="medium"/>
                <Typography>{props.category.name}</Typography>
            </div>
        </Grid>
    )
};
