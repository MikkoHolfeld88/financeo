import {FormControl, InputLabel, SelectChangeEvent, Select as SelectMUI} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

export interface ISelectProps {
    id: string,
    label: string,
    options: Option[],
    defaultValue?: any
}

export type Option = {
    value: any;
    label: string;
}

const Select = (props: ISelectProps) => {
    const [state, setState] = React.useState(props.defaultValue);

    const handleChange = (event: SelectChangeEvent) => {
        setState(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id={props.id}>{props.label}</InputLabel>
            <SelectMUI
                defaultValue={state}
                key={props.id}
                labelId={props.label + props.id}
                id={props.id}
                value={state}
                onChange={handleChange}
                autoWidth
                label={props.label}>
                {
                    props.options.map((option) => {
                        return (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        )
                    })
                }
            </SelectMUI>
        </FormControl>
    )
}

export default Select;