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
import getData from "../../services/databaseService";
import {updateAccounts} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";

export function AddAccountButton() {
    return (
        <Box>
            <Tooltip title={"Add new account / depot"} placement="right">
                <Button variant="outlined" startIcon={<AddIcon />}>
                    Add
                </Button>
            </Tooltip>
        </Box>
    );
}

const AccountsAndDepots = () => {
    const [ user ]: any | undefined = useAuthState(auth);
    const dispatch = useDispatch();
    const accounts = useSelector((state: RootState) => state.accounts.data);
    const [isLoading, setIsLoading] = React.useState(true)

    useEffect(() => {
        const accountsPromise = getData('accountsAndDepots', user.uid.toString());
        accountsPromise.then((accounts) => {
            dispatch(updateAccounts(accounts));
            setIsLoading(false)
        });
    }, [])

    const theme = useTheme();
    const desktopScreenSize = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <React.Fragment>
            <h1>Accounts and Depots</h1>
            <AddAccountButton />
            <div style={{ marginTop: "5px"}}/>
            {
                desktopScreenSize &&
                <AccountHead />
            }
            {
                desktopScreenSize &&
                <Divider />
            }
            {
                !isLoading && accounts.map((account, index) => {
                    return <Account
                        key={account.iban}
                        id={index + 1}
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