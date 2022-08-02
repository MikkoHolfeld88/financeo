import React, {useEffect} from 'react';
import 'react-edit-text/dist/index.css';
import {Account, AccountHead} from "../../components/account";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {RootState} from "../../store/store";
import {IAccountProps} from "../../components/account/Account";
import {useSelector} from "react-redux";
import AddAccountButton from "../../components/account/AddAccountButton";
import {addData} from "../../services/databaseService/databaseService";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService/firebaseService";

export function Spacer(props: any) {
    return (
        <div style={{marginTop: props?.marginTop ? props?.marginTop : "25px"}}></div>
    )
}

const AccountsAndDepots = () => {
    const [user] = useAuthState(auth);
    let status = useSelector((state: RootState) => state.accounts.status);
    let accounts = useSelector((state: RootState) => state.accounts.data);
    const theme = useTheme();
    const desktopScreenSize = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        if(status !== "idle"){
            addData("accountsAndDepots", user ? user?.uid : "none", {accounts})
        }
    }, [accounts && accounts.length]);

    return (
        <React.Fragment>
            <h1>Accounts and Depots</h1>
            <AddAccountButton/>
            <Spacer/>
            {
                desktopScreenSize &&
                <AccountHead/>
            }
            <Spacer/>
            {
                accounts && accounts.map((account: IAccountProps, index: number) => {
                return <React.Fragment key={index + "_reactFragment"}>
                            <Account
                                id={account.id}
                                key={index + "_account"}
                                index={index}
                                type={account.type}
                                iban={account.iban}
                                bic={account.bic}
                                owner={account.owner}
                                bank={account.bank}/>
                            {
                                desktopScreenSize &&
                                <Spacer key={index + "_spacer"} marginTop="10px"/>
                            }
                        </React.Fragment>
                })
            }
        </React.Fragment>
    )
}

export default AccountsAndDepots;