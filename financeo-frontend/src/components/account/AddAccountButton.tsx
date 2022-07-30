import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService/firebaseService";
import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import {Button, FormControl, TextField, Tooltip} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DialogFinanceo from "../utils/DialogFinanceo";
import {addAccount} from "../../store/slices/accountsSlice";
import {SelectFinanceo} from "../utils";
import {Spacer} from "../../pages/accountingPage/AccountsAndDepots";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export default function AddAccountButton() {
    const [user] = useAuthState(auth);
    let accounts = useSelector((state: RootState) => state.accounts.data);
    const userName = user ? user?.displayName : "";
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState("Account");
    const [bank, setBank] = React.useState("");
    const [iban, setIban] = React.useState("");
    const [bic, setBic] = React.useState("");
    const [owner, setOwner] = React.useState(userName);

    const openAddAccountDialog = () => {
        setOpen(true);
    }

    useEffect(() => {
        setType("Account");
        setBank("");
        setIban("");
        setBic("");
        setOwner("");
    }, [accounts.length]);

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
                <DialogFinanceo
                    title={"Add new Account / Depot"}
                    open={open}
                    confirmButtonText="Add"
                    onConfirm={addAccount}
                    onCofirmParameters={{type: type, bank: bank, iban: iban, bic: bic, owner: owner}}
                    setOpen={setOpen}>
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

                </DialogFinanceo>
            }
        </Box>
    );
}