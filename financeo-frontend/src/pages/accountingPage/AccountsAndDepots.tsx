import React from 'react';
import {Button, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import 'react-edit-text/dist/index.css';
import {Account, AccountHead} from "../../components/account";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {RootState, useAppDispatch} from "../../store/store";
import {IAccountProps} from "../../components/account/Account";
import {useSelector} from "react-redux";


export function Spacer(props: any){
    return (
        <div style={{marginTop: props?.marginTop ? props?.marginTop : "25px"}}></div>
    )
}

export function AddAccountButton() {
    return (
        <Box>
            <Tooltip title={"Add new account / depot"} placement="right">
                <Button variant="outlined" startIcon={<AddIcon/>}  style={{ border: '2px solid' }}>
                    Add
                </Button>
            </Tooltip>
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
                    return <Account
                        key={index}
                        id={index}
                        type={account.type}
                        iban={account.iban}
                        bic={account.bic}
                        owner={account.owner}
                        bank={account.bank}/>
                })
            }
        </React.Fragment>
    )
}

export default AccountsAndDepots;