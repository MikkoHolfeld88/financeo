import React from "react";
import Box from "@mui/material/Box";
import {Button, FormControl, TextField, Tooltip} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {addAccount, useAppDispatch} from "../../store";
import {PaperComponent, SelectFinanceo} from "../utils";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AccountBalanceIconOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PersonIcon from '@mui/icons-material/Person';

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

    function resetEntries() {
        setType("Account");
        setBank("");
        setIban("");
        setBic("");
        setOwner("");
    }

    function onAdd() {
        dispatch(addAccount({
            type: type,
            bank: bank,
            iban: iban,
            bic: bic,
            owner: owner,
        }));
        resetEntries();
        setOpen(false);
    }

    const typeOptions = [
        {value: "Account", label: "Account"},
        {value: "Depot", label: "Depot"},
    ]

    const formFieldStyle = {
        marginTop: '7px',
        display: 'flex',
        alignItems: 'flex-start'
    }

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

                    <DialogTitle style={{cursor: 'move'}} id="financeo-draggable-dialog">
                        Add new Account / Depot
                    </DialogTitle>

                    <DialogContent>
                        <FormControl required sx={formFieldStyle}>
                            <SelectFinanceo
                                state={type}
                                setState={setType}
                                label="Type *"
                                options={typeOptions}/>
                        </FormControl>
                        <FormControl sx={formFieldStyle}>
                            <TextField
                                id="input-with-sx"
                                label="Bank"
                                variant="outlined"
                                value={bank}
                                onChange={(event) => setBank(event.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <AccountBalanceIconOutlinedIcon fontSize="small"/>
                                    )
                                }}/>

                        </FormControl>
                        <FormControl sx={formFieldStyle}>
                            <TextField
                                id="input-with-sx"
                                label="IBAN"
                                variant="outlined"
                                value={iban}
                                onChange={(event) => setIban(event.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <CreditCardIcon fontSize="small"/>
                                    )
                                }}/>


                        </FormControl>
                        <FormControl sx={formFieldStyle}>
                            <TextField
                                id="input-with-sx"
                                label="BIC"
                                variant="outlined"
                                value={bic}
                                onChange={(event) => setBic(event.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <FingerprintIcon fontSize="small"/>
                                    )
                                }}/>
                        </FormControl>
                        <FormControl sx={formFieldStyle}>
                            <TextField
                                id="input-with-sx"
                                label="Owner"
                                variant="outlined"
                                value={owner}
                                onChange={(event) => setOwner(event.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <PersonIcon fontSize="small"/>
                                    )
                                }}/>
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