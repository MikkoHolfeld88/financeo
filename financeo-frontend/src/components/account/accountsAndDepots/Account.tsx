import React, {useEffect} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from "@mui/material/Typography";
import {deleteAccount, IAccountProps, removePickedAccount, RootState, useAppDispatch} from "../../../store";
import {useSelector} from "react-redux";
import * as COLORS from "../../../constants/colors"
import "../index.scss";
import {PaperComponentFinanceo} from "../../utils";
import {addAllData} from "../../../services/databaseService/databaseService";
import AccountDesktop from "./AccountDesktop";
import AccountMobile from "./AccountMobile";

const ibantools = require('ibantools');


export default function Account(props: IAccountProps) {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const uid = useSelector((state: RootState) => state.login.uid);
    const desktopScreenSize = useMediaQuery(theme.breakpoints.up('md'));
    const accounts = useSelector((state: RootState) => state.accounts.data);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);
    const pickedAccountStatus = useSelector((state: RootState) => state.accountPicker.status);
    const pickedAccounts = useSelector((state: RootState) => state.accountPicker.pickedAccounts);

    const mobileScreenSize = !desktopScreenSize;

    useEffect(() => {
        if (pickedAccountStatus !== "idle") {
            // here addData removes one account of pickedAccounts
            // in case an account has been deleted from the accountList
            addAllData("pickedAccounts", uid, {pickedAccounts})
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
        if(props.type === "Depot") {
            return "depotType";
        }

        if(props.type === "Creditcard") {
            return "creditCardType";
        }

        return "accountType";
    };

    const onDeleteAccount = () => {
        dispatch(deleteAccount(props.id));
        props?.index && dispatch(removePickedAccount(props?.id));
        setDeleteDialogOpen(false);
    }

    const onSaveValues = {
        path: 'accountsAndDepots',
        uid: uid,
        updateValue: {accounts}
    };

    const marginLeft = desktopScreenSize ? "8px" : "0px"; // different margin on desktop and mobile

    const index = (props?.index !== null && props?.index !== undefined) && (props?.index + 1).toString();

    return (
        <div style={{marginLeft: marginLeft}}>
            {
                desktopScreenSize &&
                <AccountDesktop
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

            }
            {
                mobileScreenSize &&
                <AccountMobile
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
            }
            {
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    PaperComponent={PaperComponentFinanceo}
                    aria-labelledby="Delete Account / Depot">
                    <DialogTitle id="Delete Account" style={{color: COLORS.SCHEME.warn}}>
                        {"Delete " + props.type}
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            {"Really delete " + props.type + " '" + props.bank + "'?"}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={() => setDeleteDialogOpen(false)}>
                            No
                        </Button>
                        <Button
                            style={{color: COLORS.SCHEME.warn}}
                            onClick={onDeleteAccount}>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </div>
    )
}
