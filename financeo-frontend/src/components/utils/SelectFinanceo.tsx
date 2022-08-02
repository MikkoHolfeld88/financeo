import React from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {useDispatch} from "react-redux";

export type Option = {
    value: any | undefined,
    label: string | any,
}

export interface ISelectFinanceoProps {
    label: string,
    options: Option[],
    state?: any,
    setState?: any,
    defaultValue?: any,
    style?: any,
    fontSize?: number
    useState?: boolean,
    autoWidth?: boolean,
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

    // if externally Controlled defaultValue is already given
    const [state, setState] = React.useState(determineInitialState());

    const localHandleChange = (event: SelectChangeEvent) => {
        setState(event.target.value as string);
    };

    const givenHandleChange = (event: SelectChangeEvent) => {
        if(props.useState){
            props.setState(event.target.value as string);
        } else {
            dispatch(props.setState(event.target.value));
        }
    }

    return (
            <FormControl sx={props.style && props.style}>
                <InputLabel id={props.label + "_inputLabel"}>{props.label}</InputLabel>
                <Select
                    autoWidth={props.autoWidth}
                    sx={{fontSize: props.fontSize + "px"}}
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
