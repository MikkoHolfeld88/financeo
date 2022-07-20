import React from 'react';
import {EditText, inputTextType} from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import './index.scss'
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";

interface ITextEditFinanceoProps {
    name: string,
    defaultValue?: any,
    placeholder?: string,
    type?: inputTextType,
    state?: any,
    setState?: any,
    className?: string,
    inputClassName?: string,
    maxSize?: number,
}

export default function TextEditFinanceo(props: ITextEditFinanceoProps) {
    const [exceededMaxSize, setExceededMaxSize] = React.useState(
        false
    )
    const [visibleSnackbar, setSnackbarVisibility] = React.useState(
        false
    )

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setSnackbarVisibility(false);
    };

    const handleChange = (event: any, setState: any) => {
        if(props?.maxSize && props?.maxSize < event.target.value.length){
            setExceededMaxSize(true);
            setSnackbarVisibility(true);
            return
        }

        if(props?.maxSize && exceededMaxSize){
            setExceededMaxSize(false);
        }

        if(props.setState && props.state){
            props.setState(event.target.value);
        } else {
            setState(event.target.value);
        }
    };

    const [state, setState] = React.useState(
        props?.defaultValue ? props?.defaultValue : 'emptyTextInput'
    );

    return (
        <React.Fragment>
            <EditText
                className={props?.className ? props?.className : "textEditFinanceo"}
                inputClassName={exceededMaxSize ? "textEditFinanceoInputExceededMaxSize" : "textEditFinanceoInput"}
                placeholder={props?.placeholder ? props?.placeholder : "emptyTextInput"}
                name={props.name ? props.name : "name"}
                type={props?.type ? props?.type : "text"}
                value={props?.state ? props?.state : state}
                onChange={(event) => handleChange(event, setState)}
            />
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center" }}
                autoHideDuration={5000}
                open={visibleSnackbar}
                onClose={handleSnackbarClose}>
                <Alert severity={"warning"}>Exceeded maximum character length!</Alert>
            </Snackbar>
         </React.Fragment>
    )
}

