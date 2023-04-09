import React, {Fragment, useEffect} from 'react';
import 'react-edit-text/dist/index.css';
import {Account, AccountHead} from "../../../components/account";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {RootState} from "../../../store";
import {IAccountProps} from "../../../store";
import {useSelector} from "react-redux";
import AddAccountButton from "../../../components/account/accountsAndDepots/addAccount/AddAccountButton";
import {addAllData} from "../../../services/databaseService/databaseService";
import {FIRESTORE_COLLECTIONS} from "../../../services/databaseService/colletions";

export function Spacer(props: any) {
    return (
        <div style={{marginTop: props?.marginTop ? props?.marginTop : "25px"}}></div>
    )
}

const AccountsAndDepots = () => {
    const theme = useTheme();
    const uid = useSelector((state: RootState) => state.login.uid);
    const status = useSelector((state: RootState) => state.accounts.status);
    const accounts = useSelector((state: RootState) => state.accounts.data);
    const desktopScreenSize = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        if (status !== "idle") {
            addAllData(FIRESTORE_COLLECTIONS.ACCOUNTS_AND_DEPOTS, uid, {accounts});
        }
    }, [accounts && accounts.length]);

    return (
        <Fragment>
            <br/>
            <AddAccountButton/>
            <Spacer/>
            {
                desktopScreenSize &&
                <AccountHead/>
            }
            <Spacer/>
            {
                accounts && accounts.map((account: IAccountProps, index: number) => {
                    return <Fragment key={index + "_reactFragment"}>
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
                    </Fragment>
                })
            }
        </Fragment>
    )
}

export default AccountsAndDepots;
