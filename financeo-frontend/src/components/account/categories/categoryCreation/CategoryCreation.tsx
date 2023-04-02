import {Grid, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {CategoryIconPicker} from "../categoryIconPicker/CategoryIconPicker";
import {CategoryMatchers} from "../CategoryMatchers";
import {
    AccountingCategory,
    addAccountingCategory, editAccountingCategory,
    removeAccountingCategory,
    setSelectedCategory
} from "../../../../store/slices/accountingCategory/accountingCategorySlice";
import {v4} from "uuid";
import {useAppDispatch} from "../../../../store";
import {useSelector} from "react-redux";
import {DeletionDialog} from "./DeletionDialog";

const HEADLINE = "Create category";
const EXPLANATION = "Enter category name, icon and matchers to provide meaningful " +
    "accounting labels. Most bookings are labeled automatically. " +
    "Nevertheless individualizing category labels helps investigating financial behaviour.";

export const CategoryCreation = () => {
    const dispatch = useAppDispatch();
    const categories: AccountingCategory[] = useSelector((state: any) => state.accountingCategory.categories);
    const selectedCategory: AccountingCategory | undefined | null = useSelector((state: any) => state.accountingCategory.selectedCategory);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [matchers, setMatchers] = useState([""]);
    const [description, setDescription] = useState("");
    const [value, setValue] = useState<null | string>(null);
    const [defaultCategory, setDefaultCategory] = useState(false);
    const [iconDialogOpen, setIconDialog] = React.useState(false);
    const [creationDisabled, setCreationDisabled] = useState(true);
    const [deletionDisabled, setDeletionDisabled] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (name !== "") { // name field is not empty
            if (categoryNameIsTaken()) {
                setSelectedCategory(name)
            } else {
                setDefaultCategory(false);
                setDeletionDisabled(true);
            }

            if (matchers[0] !== "" && value !== null) {
                setCreationDisabled(false);
            } else {
                setCreationDisabled(true);
            }
        } else { // name field is empty
            selectedCategory !== undefined && dispatch(setSelectedCategory(undefined));
            setCreationDisabled(true);
            setDefaultCategory(false);
        }
    }, [name, matchers, value]);

    useEffect(() => {
        if (!categoryNameIsTaken()) {
            setEditMode(false);
        }
    }, [name]);

    useEffect(() => {
        if (selectedCategory !== null && selectedCategory !== undefined) {
            setName(selectedCategory.name);
            setValue(selectedCategory.icon);
            setDescription(selectedCategory.description === undefined ? "" : selectedCategory.description)

            if (selectedCategory?.default) {
                setDefaultCategory(true);
            } else {
                setDeletionDisabled(false);
                setDefaultCategory(false);
                setEditMode(true);
            }

            setMatchersBySelectedCategory();
        }
    }, [selectedCategory]);


    // Sets local matchers state to matchers of selected category state
    const setMatchersBySelectedCategory = () => {
        if (typeof selectedCategory?.matchers === "object" && selectedCategory?.matchers.length > 0) {
            setMatchers(selectedCategory?.matchers);
        } else {
            setMatchers([""]);
        }
    }

    // checks whether category name is already taken
    const categoryNameIsTaken = () => {
        const categoryNames = categories.map(category => category.name);
        if (categoryNames.includes(name)) {
            selectedCategory === undefined || selectedCategory === null && setNameError(true);
            return true;
        } else {
            setNameError(false);
            return false;
        }
    }

    const onCreateCategory = () => {
        if (categoryNameIsTaken()) {
            console.log("name is taken")
            dispatch(editAccountingCategory({
                id: selectedCategory?.id,
                name: name,
                matchers: matchers,
                description: description,
                icon: value,
                default: false
            }))
        } else {
            const newCategory: AccountingCategory = {
                id: v4(),
                name: name,
                matchers: matchers,
                description: description,
                icon: value,
                default: false
            }
            dispatch(addAccountingCategory(newCategory));
        }

        clearLocalStates();
        setDeletionDisabled(true);
        setDefaultCategory(false);
    };

    const onDeleteCategory = () => {
        dispatch(removeAccountingCategory(selectedCategory))
        clearLocalStates();
        setDeleteDialogOpen(false);
        setDeletionDisabled(true);
    }

    const clearLocalStates = () => {
        setName("");
        setMatchers([""]);
        setDescription("");
        setValue(null);
        setDefaultCategory(false);
        setDeletionDisabled(false);
    };

    const pickIcon = (icon: string | null) => {
        setIconDialog(false);
        setValue(icon);
    };

    const setMatcher = (newMatcher: string, index: number) => {
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
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography sx={{marginTop: "10px", textAlign: "center"}} variant="h6">{HEADLINE}</Typography>
                <TextField
                    label="Name"
                    required
                    error={nameError}
                    variant="standard"
                    fullWidth
                    value={name}
                    style={{fontSize: "20px"}}
                    helperText={nameError ? "Name already taken! Existing category will be overwritten." : name.length === 0 && "Enter category name"}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField
                    label="Description"
                    disabled={defaultCategory}
                    variant="standard"
                    fullWidth
                    value={description}
                    style={{fontSize: "20px"}}
                    helperText={description.length === 0 && "Enter category description"}
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
                                defaultCategory={defaultCategory}
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
                    defaultCategory={defaultCategory}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <Button
                            onClick={() => setDeleteDialogOpen(true)}
                            disabled={defaultCategory || deletionDisabled}
                            fullWidth
                            color="warning"
                            variant="contained"
                            sx={{margin: "10px 0px 10px 0px", color: "white"}}>
                            Delete
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <Button
                            onClick={onCreateCategory}
                            disabled={creationDisabled || nameError}
                            fullWidth
                            variant="contained"
                            sx={{margin: "10px 0px 10px 0px", color: "white"}}>
                            {editMode ? "Edit" : "Create"}
                        </Button>
                    </Grid>
                </Grid>

                <DeletionDialog
                    deleteDialogOpen={deleteDialogOpen}
                    setDeleteDialogOpen={setDeleteDialogOpen}
                    onDeleteCategory={onDeleteCategory}
                    name={name}
                />
            </Grid>
        </Grid>
    )
};
