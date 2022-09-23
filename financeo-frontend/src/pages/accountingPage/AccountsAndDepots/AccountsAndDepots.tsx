import React, {useEffect} from 'react';
import 'react-edit-text/dist/index.css';
import {Account, AccountHead} from "../../../components/account";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {RootState} from "../../../store/store";
import {IAccountProps} from "../../../store";
import {useSelector} from "react-redux";
import AddAccountButton from "../../../components/account/AddAccountButton";
import {addAllData} from "../../../services/databaseService/databaseService";

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
            addAllData("accountsAndDepots", uid, {accounts});
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
