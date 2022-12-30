import {Autocomplete, Grid, Icon, TextField, Tooltip, Typography} from "@mui/material";
import {iconList} from "../../../store/slices/accountingCategorySlice/iconList";
import "./style.scss";
import {useState} from "react";
import Button from "@mui/material/Button";

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
    const [value, setValue] = useState<null | string>(null);

    const chooseIcon = (iconName: string) => {
        console.log(iconName);
    }

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} style={props?.containerStlye}>
                <Typography className="heading" variant="h6">Create category</Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={props?.containerStlye} sx={styles.invisibleScrollbar}>
                <Autocomplete
                    autoHighlight
                    onChange={(event: any, newValue: string | null) => {setValue(newValue)}}
                    options={iconList}
                    className="autoComplete"
                    renderInput={(params) =>
                        <TextField {...params} label="Icon" variant="standard"/>}
                />
                {
                    !value ? iconList.map((icon, index) => {
                        return (
                            <Tooltip
                                title={icon.replace(new RegExp('_', "g"), " ")}
                                followCursor
                                key={index}>
                                <Icon
                                    onClick={() => chooseIcon(icon)}
                                    sx={styles.iconSize}
                                    key={index}
                                    className="iconOfList hvr-float">
                                    {icon}
                                </Icon>
                            </Tooltip>
                        )
                    }) : iconList.find((icon) => value === icon) &&
                        <Icon
                            onClick={() => chooseIcon(value)}
                            sx={styles.iconSize}
                            className="iconOfList hvr-float">
                            {value}
                        </Icon>
                }
            </Grid>
        </Grid>
    )
};
