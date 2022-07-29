import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, {PaperProps} from '@mui/material/Paper';
import Draggable from 'react-draggable';
import {useAppDispatch} from "../../store/store";

export interface IDialogFinanceoProps {
    open: boolean,
    setOpen: any,
    title?: string,
    children: any,
    confirmButtonText?: any
    onConfirm?: any,
}

function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle="#financeo-draggable-dialog"
            cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export default function DialogFinanceo(props: IDialogFinanceoProps) {
    const dispatch = useAppDispatch();
    const handleClose = () => {
        props.setOpen(false);
    };

    function onConfirmClick(event: any){
        dispatch(props?.onConfirm(event.target.value));
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby={props?.title ? props?.title : "financeo-draggable-dialog"}>
                <DialogTitle style={{ cursor: 'move' }} id="financeo-draggable-dialog">
                    {props?.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    {
                        props?.confirmButtonText &&
                        <Button
                            onClick={onConfirmClick}>
                            {props?.confirmButtonText}
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}