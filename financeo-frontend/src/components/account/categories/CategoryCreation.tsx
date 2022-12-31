import {Grid, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {CategoryIconPicker} from "./CategoryIconPicker";
import {CategoryMatchers} from "./CategoryMatchers";
import {
    AccountingCategory,
    addAccountingCategory
} from "../../../store/slices/accountingCategorySlice/accountingCategorySlice";
import {v4} from "uuid";
import {useAppDispatch} from "../../../store";

const HEADLINE = "Create category";
const EXPLANATION = "Enter category name, icon and matchers to provide meaningful " +
    "accounting labels. Most bookings are labeled automatically. " +
    "Nevertheless individualizing category labels helps investigating financial behaviour.";

export const CategoryCreation = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState("");
    const [matchers, setMatchers] = useState([""]);
    const [description, setDescription] = useState("");
    const [value, setValue] = useState<null | string>(null);
    const [iconDialogOpen, setIconDialog] = React.useState(false);
    const [creationDisabled, setCreationDisabled] = useState(true);

    useEffect(() => {
        if (name !== "" && matchers[0] !== "" && value !== null) {
            setCreationDisabled(false);
        } else {
            setCreationDisabled(true);
        }
    }, [name, matchers, value]);

    const onCreate = () => {
        const newCategory: AccountingCategory = {
            id: v4(),
            name: name,
            matchers: matchers,
            description: description,
            icon: value,
            default: false
        }
        dispatch(addAccountingCategory(newCategory));
        clearLocalStates();
    };

    const clearLocalStates = () => {
        setName("");
        setMatchers([""]);
        setDescription("");
        setValue(null);
    };

    const pickIcon = (icon: string | null) => {
        setIconDialog(false);
        setValue(icon);
    };

    const setMatcher = (newMatcher: string, index: number) => {
        console.log(matchers);
        setMatchers(existingMatchers => {
            return [
                ...existingMatchers.slice(0, index),
                newMatcher,
                ...existingMatchers.slice(index + 1),
            ]
        });
    };

    const addMatcher = () => {
        setMatchers(existingMatchers => {
            return [...existingMatchers, ""]
        });
    };

    const removeMatcher = (index: number) => {
        if (matchers.length > 1) {
            setMatchers(existingItems => {
                return [
                    ...existingItems.slice(0, index),
                    ...existingItems.slice(index + 1),
                ]
            })
        }
    }

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography sx={{marginTop: "10px"}} variant="h6">{HEADLINE}</Typography>
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
                <TextField
                    variant="standard"
                    fullWidth
                    label="Description"
                    value={description}
                    style={{fontSize: "20px"}}
                    helperText="Enter category description"
                    onChange={(event) => setDescription(event.target.value)}
                />
                {
                    matchers.map((matcher, index) => {
                        return (
                            <CategoryMatchers
                                key={index}
                                index={index}
                                matcher={matchers[index]}
                                setMatcher={setMatcher}
                                addMatcher={addMatcher}
                                removeMatcher={removeMatcher}
                                lastMatcher={index === matchers.length - 1}
                            />
                        );
                    })
                }
                <CategoryIconPicker
                    value={value}
                    setValue={setValue}
                    pickIcon={pickIcon}
                    open={iconDialogOpen}
                    setOpen={setIconDialog}
                />
                <Button
                    onClick={onCreate}
                    disabled={creationDisabled}
                    fullWidth
                    variant="contained"
                    sx={{margin: "10px 0px 10px 0px", color: "white"}}>
                    Create
                </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            </Grid>
        </Grid>
    )
};
