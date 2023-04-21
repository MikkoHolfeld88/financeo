import React, {useEffect} from "react";
import {deleteAccount, IAccountProps, removePickedAccount, RootState, useAppDispatch} from "../../../store";
import {useSelector} from "react-redux";
import {addAllData} from "../../../services/databaseService/databaseService";
import AccountTable from "./AccountTable";
import {AccountDeletionDialog} from "./AccountDeletionDialog";
import {FIRESTORE_COLLECTIONS} from "../../../services/databaseService/colletions";
import "../accountStyles.scss";
const ibantools = require('ibantools');

export default function Account(props: IAccountProps) {
    const dispatch = useAppDispatch();
    const uid = useSelector((state: RootState) => state.login.uid);
    const accounts = useSelector((state: RootState) => state.accounts.data);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);
    const pickedAccountStatus = useSelector((state: RootState) => state.accountPicker.status);
    const pickedAccounts = useSelector((state: RootState) => state.accountPicker.pickedAccounts);


    useEffect(() => {
        if (pickedAccountStatus !== "idle") {
            // here addData removes one account of pickedAccounts in case an account has been deleted from the accountList
            addAllData(FIRESTORE_COLLECTIONS.PICKED_ACCOUNTS, uid, {pickedAccounts})
        }
    }, [pickedAccounts]);

    const ibanValidation = {
        function: ibantools.isValidIBAN,
        message: "IBAN is not valid!"
    }

    const BICValidation = {
        function: ibantools.isValidBIC,
        message: "BIC is not valid!"
    }

    function getAccountStyle() {
        switch (props.type) {
            case "Depot":
                return "depotType";
            case "Creditcard":
                return "creditCardType";
            default:
                return "accountType";
        }
    }

    const onDeleteAccount = () => {
        dispatch(deleteAccount(props.id));
        props?.index && dispatch(removePickedAccount(props?.id));
        setDeleteDialogOpen(false);
    }

    const onSaveValues = {
        path: FIRESTORE_COLLECTIONS.ACCOUNTS_AND_DEPOTS,
        uid: uid,
        updateValue: {accounts}
    };

    const index = (props?.index !== null && props?.index !== undefined) && (props?.index + 1).toString();

    return (
        <div id="accountContainer">
            <AccountTable
                index={index}
                type={props.type!}
                bank={props.bank!}
                iban={props.iban!}
                bic={props.bic!}
                owner={props.owner!}
                ibanValidation={ibanValidation}
                bicValidation={BICValidation}
                setDeleteDialogOpen={setDeleteDialogOpen}
                onSaveValues={onSaveValues}
                getAccountStyle={getAccountStyle}/>
            <AccountDeletionDialog
                deleteDialogOpen={deleteDialogOpen}
                setDeleteDialogOpen={setDeleteDialogOpen}
                onDeleteAccount={onDeleteAccount}
                type={props.type!}
                bank={props.bank!}/>
        </div>
    )
}
