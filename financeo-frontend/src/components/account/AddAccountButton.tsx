import React from "react";
import Box from "@mui/material/Box";
import {Button, FormControl, TextField, Tooltip} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useAppDispatch} from "../../store/store";
import {addAccount} from "../../store/slices/accountsSlice";
import {SelectFinanceo} from "../utils";
import {Spacer} from "../../pages/accountingPage/AccountsAndDepots";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Paper, {PaperProps} from "@mui/material/Paper";
import Draggable from "react-draggable";

function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle="#financeo-draggable-dialog"
            cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export default function AddAccountButton() {
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState<"Account" | "Depot">("Account");
    const [bank, setBank] = React.useState("");
    const [iban, setIban] = React.useState("");
    const [bic, setBic] = React.useState("");
    const [owner, setOwner] = React.useState("");

    const openAddAccountDialog = () => {
        setOpen(true);
    }

    function onAdd() {
        dispatch(addAccount({
            type: type,
            bank: bank,
            iban: iban,
            bic: bic,
            owner: owner,
        }));
    }

    const typeOptions = [
        {value: "Account", label: "Account"},
        {value: "Depot", label: "Depot"},
    ]

    return (
        <Box>
            <Tooltip title={"Add new Account / Depot"} placement="right">
                <Button
                    onClick={openAddAccountDialog}
                    variant="outlined"
                    startIcon={<AddIcon/>}
                    style={{border: '2px solid'}}>
                    Add
                </Button>
            </Tooltip>
            {
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    PaperComponent={PaperComponent}
                    aria-labelledby="Add new Account / Depot">
                    <DialogTitle style={{ cursor: 'move' }} id="financeo-draggable-dialog">
                        Add new Account / Depot
                    </DialogTitle>
                    <DialogContent>

                        <Spacer marginTop="10px"/>
                        <FormControl required sx={{display: 'flex', alignItems: 'flex-start'}}>
                            <SelectFinanceo
                                autoWidth={true}
                                state={type}
                                setState={setType}
                                label="Type *"
                                options={typeOptions}/>
                        </FormControl>

                        <Spacer marginTop="10px"/>

                        <FormControl sx={{display: 'flex', alignItems: 'flex-start'}}>
                            <TextField
                                id="input-with-sx"
                                label="Bank"
                                variant="outlined"
                                value={bank}
                                onChange={(event) => setBank(event.target.value)}/>
                        </FormControl>

                        <Spacer marginTop="10px"/>

                        <FormControl sx={{display: 'flex', alignItems: 'flex-start'}}>
                            <TextField
                                id="input-with-sx"
                                label="IBAN"
                                variant="outlined"
                                value={iban}
                                onChange={(event) => setIban(event.target.value)}/>
                        </FormControl>

                        <Spacer marginTop="10px"/>

                        <FormControl sx={{display: 'flex', alignItems: 'flex-start'}}>
                            <TextField
                                id="input-with-sx"
                                label="BIC"
                                variant="outlined"
                                value={bic}
                                onChange={(event) => setBic(event.target.value)}/>
                        </FormControl>

                        <Spacer marginTop="10px"/>

                        <FormControl sx={{display: 'flex', alignItems: 'flex-start'}}>
                            <TextField
                                id="input-with-sx"
                                label="Owner"
                                variant="outlined"
                                value={owner}
                                onChange={(event) => setOwner(event.target.value)}/>
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={onAdd}>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </Box>
    );
}