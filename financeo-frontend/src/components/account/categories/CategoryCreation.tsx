import {Container, Grid, TextField, Tooltip, Typography} from "@mui/material";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {CategoryIconPicker} from "./CategoryIconPicker";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as COLORS from "../../../constants/colors";

const HEADLINE = "Create category";
const EXPLANATION = "Enter category name, icon and matchers to provide meaningful " +
    "accounting labels. Most bookings are labeled automatically. " +
    "Nevertheless individualizing category labels helps investigating your personal financial behaviour.";

export const CategoryCreation = () => {
    let matchers: string[] = [];
    const [name, setName] = useState("");
    const [matcher, setMatcher] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState<null | string>(null);
    const [iconDialogOpen, setIconDialog] = React.useState(false);

    const pickIcon = (icon: string | null) => {
        setIconDialog(false);
        setValue(icon);
    };

    const addMatcher = () => {
        matchers.push(matcher);
        setMatcher("");
    };

    const removeMatcher = () => {
        matchers = matchers.filter(matcherToRemove => matcherToRemove !== matcher);
        setMatcher("");
    };

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography sx={{marginTop: "10px"}}variant="h6">{HEADLINE}</Typography>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="textFieldGrid">
                        <TextField
                            required
                            variant="standard"
                            fullWidth
                            label="Name"
                            value={name}
                            style={{fontSize: "20px"}}
                            helperText="Enter category name"
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="textFieldGrid">
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Description"
                            value={description}
                            style={{fontSize: "20px"}}
                            helperText="Enter category description"
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10} xl={10} className="textFieldGrid">
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Matcher"
                            value={description}
                            style={{fontSize: "20px"}}
                            helperText="Enter category description"
                            onChange={(event) => setMatcher(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} lg={1} xl={1} className="textFieldGrid">
                        <Tooltip title="Add matcher to matchers list" followCursor>
                            <IconButton onClick={() => addMatcher()} aria-label="delete matcher">
                                <AddIcon color="primary"/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} lg={1} xl={1} className="textFieldGrid">
                        <Tooltip title="Remove matcher to matchers list" followCursor>
                            <IconButton onClick={() => removeMatcher()} aria-label="delete matcher">
                                <DeleteForeverIcon sx={{color: COLORS.SCHEME.warn}}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="iconOfList">
                        <CategoryIconPicker value={value} setValue={setValue} pickIcon={pickIcon} open={iconDialogOpen} setOpen={setIconDialog}/>
                    </Grid>
                </Grid>
                <Button fullWidth variant="outlined" sx={{margin: "10px 0px 10px 0px"}}>Create</Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            </Grid>
        </Grid>
    )
};
