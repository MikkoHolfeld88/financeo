import {Grid, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as COLORS from "../../../constants/colors";
import React, {useEffect, useState} from "react";
import {TooltipFinanceo} from "../../utils/TooltipFinanceo";

interface ICategoryMatchersProps {
    lastMatcher: boolean;
    index: number;
    matcher: string;
    setMatcher: (newMatcher: string, index: number) => void;
    addMatcher: () => void;
    removeMatcher: (index: number) => void;
    defaultCategory?: boolean;
}

export const CategoryMatchers = (props: ICategoryMatchersProps) => {
    const [error, setError] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.setMatcher(event.target.value, props.index);
    }

    useEffect(() => {
        if (props.matcher.includes(" ")) {
            setError(true);
        } else {
            setError(false);
        }
    }, [props.matcher]);

    const getHelperText = () => {
        if (error) {
            return "Please only enter one matcher / word";
        }

        if (props.index === 0) {
            if (props.matcher.length === 0) {
                return "Enter matching phrase this category should be assigned to";
            }
        }

        return null;
    }

    return (
        <Grid container>
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10} className="textFieldGrid">
                <TextField
                    required
                    error={error}
                    variant="standard"
                    fullWidth
                    label={"Matcher " + (props.index + 1)}
                    value={props.matcher}
                    style={{fontSize: "20px"}}
                    helperText={getHelperText()}
                    onChange={(event) => onChange(event)}
                    disabled={props?.defaultCategory}
                />
            </Grid>
            {
                props.lastMatcher &&
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1} className="textFieldGrid">
                    <TooltipFinanceo title="Add matcher to matchers list">
                        <IconButton disabled={props?.defaultCategory} onClick={() => !error && props.addMatcher()} aria-label="delete matcher">
                            <AddIcon color={props.defaultCategory ? "disabled" : "primary"}/>
                        </IconButton>
                    </TooltipFinanceo>
                </Grid>
            }
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1} className="textFieldGrid">
                <TooltipFinanceo title="Remove matcher from matchers list">
                    <IconButton disabled={props?.defaultCategory} onClick={() => props.removeMatcher(props.index)} aria-label="delete matcher">
                        <DeleteForeverIcon color={props?.defaultCategory ? "disabled" : "warning"}/>
                    </IconButton>
                </TooltipFinanceo>
            </Grid>
        </Grid>
    )
}
