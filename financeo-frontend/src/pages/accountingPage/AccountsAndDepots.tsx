import React from 'react';
import 'react-edit-text/dist/index.css';
import {Account, AccountHead} from "../../components/account";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {RootState} from "../../store/store";
import {IAccountProps} from "../../components/account/Account";
import {useSelector} from "react-redux";
import AddAccountButton from "../../components/account/AddAccountButton";

export function Spacer(props: any) {
    return (
        <div style={{marginTop: props?.marginTop ? props?.marginTop : "25px"}}></div>
    )
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
            <Spacer/>
            {
                desktopScreenSize &&
                <AccountHead/>
            }
            <Spacer/>
            {
                accounts && accounts.map((account: IAccountProps, index: number) => {
                    return <React.Fragment>
                        <Account
                            id={account.id}
                            key={index}
                            index={index}
                            type={account.type}
                            iban={account.iban}
                            bic={account.bic}
                            owner={account.owner}
                            bank={account.bank}/>
                        {
                            desktopScreenSize &&
                            <Spacer marginTop="10px"/>
                        }
                    </React.Fragment>
                })
            }
        </React.Fragment>
    )
}

export default AccountsAndDepots;