import React from 'react';
import {Button, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import 'react-edit-text/dist/index.css';
import {Account, AccountHead} from "../../components/account";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {RootState} from "../../store/store";
import {IAccountProps} from "../../components/account/Account";
import {useSelector} from "react-redux";
import DialogFinanceo from "../../components/utils/DialogFinanceo";
import {SelectFinanceo} from "../../components/utils";
import {addAccount} from "../../store/slices/accountsSlice";


export function Spacer(props: any){
    return (
        <div style={{marginTop: props?.marginTop ? props?.marginTop : "25px"}}></div>
    )
}

export function AddAccountButton() {
    const [open, setOpen] = React.useState(false);

    const openAddAccountDialog = () => {
        setOpen(true);
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
                    style={{ border: '2px solid' }}>
                    Add
                </Button>
            </Tooltip>

            {
                <DialogFinanceo
                    title={"Add new Account / Depot"}
                    open={open}
                    confirmButtonText="Add"
                    onConfirm={addAccount}
                    setOpen={setOpen}>
                    <Spacer marginTop="10px" />
                    <SelectFinanceo
                        label="Type"
                        options={typeOptions}/>
                </DialogFinanceo>
            }
        </Box>
    );
}

const AccountsAndDepots = () => {
    let status = useSelector((state: RootState) => state.accounts.status);
    let accounts = useSelector((state: RootState) => state.accounts.data);
    const theme = useTheme();
    const desktopScreenSize = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <React.Fragment>
            <h1>Accounts and Depots</h1>
            <AddAccountButton/>
            <Spacer />
            {
                desktopScreenSize &&
                <AccountHead/>
            }
            <Spacer />
            {
                accounts && accounts.map((account: IAccountProps, index: number) => {
                    return <React.Fragment>
                        <Account
                            key={index}
                            id={index}
                            type={account.type}
                            iban={account.iban}
                            bic={account.bic}
                            owner={account.owner}
                            bank={account.bank}/>
                        {
                            desktopScreenSize &&
                            <Spacer marginTop="10px" />
                        }
                    </React.Fragment>


                })
            }
        </React.Fragment>
    )
}

export default AccountsAndDepots;