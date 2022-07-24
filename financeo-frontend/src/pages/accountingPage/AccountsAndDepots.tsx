import React, {useEffect, useState} from 'react';
import {Button, Divider, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import 'react-edit-text/dist/index.css';
import {Account, AccountHead} from "../../components/account";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {RootState, useAppDispatch} from "../../store/store";
import {IAccountProps} from "../../components/account/Account";
import getData from "../../services/databaseService/databaseService";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService/firebaseService";
import {addAccounts} from "../../store";
import {useSelector} from "react-redux";

export function AddAccountButton() {
    return (
        <Box>
            <Tooltip title={"Add new account / depot"} placement="right">
                <Button variant="outlined" startIcon={<AddIcon/>}>
                    Add
                </Button>
            </Tooltip>
        </Box>
    );
}

const AccountsAndDepots = () => {
    let status = useSelector((state: RootState) => state.accounts.status);
    const [fetchError, setFetchError] = useState(false);
    const [ user ] = useAuthState(auth);
    let accounts = useSelector((state: RootState) => state.accounts.data);
    const theme = useTheme();
    const desktopScreenSize = useMediaQuery(theme.breakpoints.up('md'));
    const uid = user ? user.uid.toString() : 'none';
    const dispatch = useAppDispatch();

    useEffect(() => {
        status === 'idle' && getData('accountsAndDepots', uid)
            .then((documentData) => {
                dispatch(addAccounts(documentData?.accounts));
            })
            .catch((error) => {
                console.log(error);
                setFetchError(true);
            });
    }, []);

    return (
        <React.Fragment>
            <h1>Accounts and Depots</h1>
            <AddAccountButton/>
            <div style={{marginTop: "5px"}}/>
            {
                desktopScreenSize &&
                <AccountHead/>
            }
            {
                desktopScreenSize &&
                <Divider/>
            }
            {

                accounts.map((account: IAccountProps, index: number) => {
                    return <Account
                        key={index}
                        id={index}
                        type={account.type}
                        iban={account.iban}
                        bic={account.bic}
                        owner={account.owner}
                        bank={account.bank}
                    />
                })
            }
        </React.Fragment>
    )
}

export default AccountsAndDepots;