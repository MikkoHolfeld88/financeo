import React from "react";
import {Autocomplete, Dialog, DialogContent, DialogTitle, Grid, Icon, TextField, Tooltip} from "@mui/material";
import {iconList} from "../../../store/slices/accountingCategorySlice/iconList";
import {styles} from "./CategoryManagement";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import * as COLORS from "../../../constants/colors"

interface CategoryIconPickerProps {
    value: string | null;
    setValue: (value: string | null) => void;
    pickIcon: (icon: string | null) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const CategoryIconPicker = (props: CategoryIconPickerProps) => {
    const initialiseIconPicker = () => {
        return iconList.map((icon, index) => {
            return (
                <Tooltip
                    title={icon.replace(new RegExp('_', "g"), " ")}
                    followCursor
                    key={index}>
                    <Icon
                        onClick={() => props.pickIcon(icon)}
                        sx={styles.iconSize}
                        key={index}
                        className="iconOfList hvr-float">
                        {icon}
                    </Icon>
                </Tooltip>
            )
        })
    };

    return (
        <Grid container justifyContent="space-evenly">
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Autocomplete
                    value={props.value}
                    autoHighlight
                    options={iconList}
                    style={{marginBottom: "10px"}}
                    onChange={(event: any, newValue: string | null) => {props.setValue(newValue)}}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            required
                            label="Icon"
                            variant="standard"
                            helperText="Search icon or select it via icon inspection"/>}
                />
            </Grid>
            <Grid item xs={12} sm={1} md={1} lg={1} xl={1} sx={{marginTop: "10px", justifyContent: "space-evenly",  alignItems: "center", textAlign: "center"}}>
                {
                    props.value && iconList.find((icon) => props.value === icon) &&
                    <Tooltip
                        arrow
                        title={"Click to remove icon"}
                        followCursor>
                        <Icon
                            onClick={() => props.setValue(null)}
                            sx={styles.iconSize}
                            className="iconOfList hvr-float">
                            {props.value}
                        </Icon>
                    </Tooltip>
                }
            </Grid>
            <Grid item xs={12} sm={5} md={5} lg={5} xl={5} sx={{marginTop: "10px"}}>
                <Button
                    sx={{alignItems: "baseline"}}
                    fullWidth
                    variant="outlined"
                    onClick={() => props.setOpen(true)}>
                    Inspect icons
                </Button>
            </Grid>

            {
                <Dialog fullWidth maxWidth="lg" open={props.open} onClose={() => props.setOpen(false)} scroll="body">
                    <DialogTitle style={{backgroundColor: COLORS.SCHEME.mainBackground, color: "white", textAlign: "center"}}>Icon inspector</DialogTitle>
                    <DialogContent>{initialiseIconPicker()}</DialogContent>
                    <DialogActions>
                        <Button
                            style={{color: "white"}}
                            variant="contained"
                            fullWidth
                            autoFocus
                            onClick={() => props.setOpen(false)}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </Grid>
    )
};