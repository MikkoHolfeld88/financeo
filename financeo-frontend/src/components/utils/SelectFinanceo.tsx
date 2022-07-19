import React from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {useDispatch} from "react-redux";

export type Option = {
    value: any,
    label: string,
}

export interface ISelectFinanceoProps {
    label: string,
    options: Option[],
    state?: any,
    setState?: any,
    defaultValue?: any,
}

export default function SelectFinanceo(props: ISelectFinanceoProps) {
    const dispatch = useDispatch();
    const externallyControlled = props.state && props.setState; // state and setState injected by parent

    const determineInitialState = (): any => {
        if(!props?.defaultValue){ return '' }

        if(props.options.some(el => el.value === props?.defaultValue)){
            return props?.defaultValue;
        }

        return '';
    }

    // if externally Controlled defaultValue is already fiven
    const [state, setState] = React.useState(determineInitialState());

    const localHandleChange = (event: SelectChangeEvent) => {
        console.log("localHandleChange");
        setState(event.target.value as string);
    };

    const givenHandleChange = (event: SelectChangeEvent) => {
        dispatch(props.setState(Number(event.target.value)));
    }

    return (

            <FormControl>
                <InputLabel id={props.label + "_inputLabel"}>{props.label}</InputLabel>
                <Select
                    labelId={props.label + "_selectLabelId"}
                    id={props.label + "_selectId"}
                    value={externallyControlled ? props.state : state}
                    label={props.label}
                    onChange={externallyControlled ? givenHandleChange : localHandleChange}>
                    {
                        props.options.map((option) => {
                            return <MenuItem value={option.value} key={option.value + "_key"}>{option.label}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
    );
}
