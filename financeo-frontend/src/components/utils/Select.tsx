import React, {useEffect} from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export type Option = {
    value: any,
    label: string,
}

export interface ISelectFinanceoProps {
    label: string,
    options: Option[],
    defaultValue?: any,
}

export default function SelectFinanceo(props: ISelectFinanceoProps) {
    const [state, setState] = React.useState(props.defaultValue ? props.defaultValue : '');

    const handleChange = (event: SelectChangeEvent) => {
        setState(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label={props.label}
                    onChange={handleChange}>
                    {
                        props.options.map((option) => {
                            return <MenuItem value={option.value} key={option.value + "_key"}>{option.label}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    );
}
