import React from 'react';
import {EditText, inputTextType, onSaveProps} from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import './index.scss'
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";
import {useDispatch} from "react-redux";
import {updateData} from "../../services/databaseService/databaseService";

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
    readonly?: boolean,
    validation?: {
        function?: any,
        message?: string,
    }
    formatDisplayFunction?: any,
    referenceValue?: any,
    onSave?: {
        path: string,
        uid: string,
        updateValue: object
    },
}

export default function TextEditFinanceo(props: ITextEditFinanceoProps) {
    const dispatch = useDispatch();
    const [exceededMaxSize, setExceededMaxSize] = React.useState(false);
    const [visibleMaxCharSnackbar, setMaxCharSnackbarVisibility] = React.useState(false);
    const [visibleValidationSnackbar, setValidationSnackbarVisibility] = React.useState(false);
    const [validField, setFieldValidity] = React.useState(true);

    const handleMaxCharSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setMaxCharSnackbarVisibility(false);
    };

    const handleValidationSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setValidationSnackbarVisibility(false);
    };

    const handleChange = (event: any, setState: any) => {
        if (props?.maxSize && props?.maxSize < event.target.value.length) {
            setExceededMaxSize(true);
            setMaxCharSnackbarVisibility(true);
            return
        }

        if (props?.maxSize && exceededMaxSize) {
            setExceededMaxSize(false);
        }

        if (props?.setState && props?.state !== null && props?.state !== undefined) { // external setState and state handling
            if(props?.referenceValue !== null && props?.referenceValue !== undefined){ // id as referenceValue
                if(props.name){ // name to change property of object
                    dispatch(props?.setState({
                            value: event.target.value,
                            id: props.referenceValue,
                            name: event.target.name
                        })
                    );
                } else { // valueChange based on id of object / array
                    dispatch(props?.setState({
                            value: event.target.value,
                            id: props.referenceValue,
                        })
                    );
                }
            }
            dispatch(props?.setState(event.target.value)); // basic external setState and state handling
        } else {
            setState(event.target.value); // local stateHandling
        }
    };

    const handleFocusOut = ({name, value, previousValue}: onSaveProps) => {
        if(props?.validation?.function){
            if (!props?.validation?.function(value)) {
                setValidationSnackbarVisibility(true);
                setFieldValidity(false);
            } else {
                setFieldValidity(true);
            }
        }

        if(props?.onSave){
            updateData(props?.onSave.path, props?.onSave.uid, props?.onSave.updateValue)
        }
    }

    const [state, setState] = React.useState(
        props?.defaultValue ? props?.defaultValue : ' '
    );

    const determineClassName = () => {
        if(!validField){
            return "textEditFinanceoInvalid";
        }

        if (props?.className) {
            return props?.className;
        }

        return "textEditFinanceo";
    }

    return (
        <React.Fragment>
            <EditText
                className={determineClassName()}
                inputClassName={exceededMaxSize ? "textEditFinanceoInputExceededMaxSize" : "textEditFinanceoInput"}
                placeholder={props?.placeholder ? props?.placeholder : " "}
                name={props.name ? props.name : "name"}
                type={props?.type ? props?.type : "text"}
                value={props?.state !== null ? props?.state : state}
                onChange={(event) => handleChange(event, setState)}
                readonly={props.readonly && props.readonly}
                onSave={handleFocusOut}
                formatDisplayText={props.formatDisplayFunction && props.formatDisplayFunction}
            />

            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                autoHideDuration={5000}
                open={visibleMaxCharSnackbar}
                onClose={handleMaxCharSnackbarClose}>
                <Alert severity={"error"}>Exceeded maximum character length!</Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                autoHideDuration={3000}
                open={visibleValidationSnackbar}
                onClose={handleValidationSnackbarClose}>
                <Alert severity={"warning"}>{props.validation?.message}</Alert>
            </Snackbar>

        </React.Fragment>
    )
}

