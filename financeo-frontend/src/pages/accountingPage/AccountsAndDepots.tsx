import React, {useEffect} from 'react';
import {Button, Divider, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import 'react-edit-text/dist/index.css';
import {Account, AccountHead} from "../../components/account";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {auth} from "../../services/firebaseService";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAllAccounts} from "../../store";
import {useSelector} from "react-redux";
import {fetchAccounts} from "../../store/slices/accountsSlice";
import {RootState, useAppDispatch} from "../../store/store";
import {IAccountProps} from "../../components/account/Account";

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
    const theme = useTheme();
    const desktopScreenSize = useMediaQuery(theme.breakpoints.up('md'));
    const dispatch = useAppDispatch();
    const accounts = useSelector(getAllAccounts);
    const accountStatus = useSelector((state: RootState) => state.accounts.status);

    useEffect(() => {
        console.log(accountStatus);
        if(accountStatus === 'idle'){
            console.log("STart dispatch")
            dispatch(fetchAccounts())
        }
    }, []);

    let content;
    if(accountStatus === 'loading'){
        content =  <h2>Loading</h2>;
    } else if (accountStatus === 'succeeded') {
        content = accounts.map((account: IAccountProps, index: number) => {
            return <Account
                key={account.iban}
                id={index + 1}
                type={account.type}
                iban={account.iban}
                bic={account.bic}
                owner={account.owner}
                bank={account.bank}
            />});
    } else if (accountStatus === 'failed'){
        content = <h2>Failed</h2>;
    }

    // const accounts = useSelector((state: RootState) => state.accounts.data);
    //
    // useEffect(() => {
    //     const accountsPromise = getData('accountsAndDepots', user.uid.toString());
    //     accountsPromise.then((accounts) => {
    //         dispatch(updateAccounts(accounts));
    //         setIsLoading(false)
    //     });
    // }, [])

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
            { content }
        </React.Fragment>
    )
}

export default AccountsAndDepots;