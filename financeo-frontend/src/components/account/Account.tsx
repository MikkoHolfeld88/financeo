import React, {useEffect} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Chip,
    Dialog, DialogActions, DialogContent, DialogTitle,
    Divider,
    Grid,
    Tooltip
} from "@mui/material";
import TextEditFinanceo from "../utils/TextEditFinanceo";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from "@mui/material/Typography";
import {deleteAccount, removePickedAccount, RootState, updateAccount, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService/firebaseService";
import * as COLORS from "../../constants/colors"
import "./index.scss";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PersonIcon from '@mui/icons-material/Person';
import {Spacer} from "../../pages/accountingPage/AccountsAndDepots";
import {PaperComponent} from "../utils";
import {addData} from "../../services/databaseService/databaseService";

const ibantools = require('ibantools');

export interface IAccountProps {
    id?: any,
    type: "Account" | "Depot" | null,
    bank?: string,
    iban?: string,
    bic?: string
    owner?: string,
    created?: string,
    index?: number
}

export default function Account(props: IAccountProps) {
    const [user] = useAuthState(auth);
    const uid = user ? user.uid.toString() : 'none';
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);
    const theme = useTheme();
    const desktopScreenSize = useMediaQuery(theme.breakpoints.up('md'));
    const miniScreenSize = useMediaQuery('(max-width:492px)');
    const pickedAccounts = useSelector((state: RootState) => state.accountPicker.value);
    const accounts = useSelector((state: RootState) => state.accounts.data);
    const pickedAccountStatus = useSelector((state: RootState) => state.accountPicker.status);
    const dispatch = useAppDispatch();

    const mobileScreenSize = !desktopScreenSize;
    const handleChange = (event: any, setState: any) => {
        setState(event.target.value);
    };

    useEffect(() => {
        if (pickedAccountStatus !== "idle") {
            addData("pickedAccounts", uid, {pickedAccounts})
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
    const ibanDisplayFunction = (iban: string) => {
        return iban.replace(/[a-zA-Z0-9_]{4}(?=.)/g, '$& ')
    }

    const onDeleteAccount = () => {
        dispatch(deleteAccount(props.id));
        props?.index && dispatch(removePickedAccount(props?.index));
        setDeleteDialogOpen(false);
    }

    const handlePanelChangeMobile = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const onSaveValues = {
        path: 'accountsAndDepots',
        uid: uid,
        updateValue: {accounts}
    };

    const handleChipClick = () => {}

    const marginLeft = desktopScreenSize ? "8px" : "0px"; // different margin on desktop and mobile
    const styleAccordionSummary = {
        border: "1px " + COLORS.SCHEME.foreground + " solid",
        borderRadius: "4px",
    }

    const index = (props?.index !== null && props?.index !== undefined) && (props?.index + 1).toString();

    return (
        <div style={{marginLeft: marginLeft}}>
            {
                desktopScreenSize &&
                <Grid container spacing={1} alignItems="center" justifyItems="center" className="gridMain">
                    <Grid item md={1} lg={1} xl={1} style={{textAlign: "center"}}>
                        <Chip
                            style={{marginBottom: "5px"}}
                            label={index}
                            variant="outlined"
                            onClick={handleChipClick}/>
                    </Grid>
                    <Grid item md={1} lg={1} xl={1}>
                        <b>
                            <TextEditFinanceo
                                className={props.type === "Account" ? "accountType" : "depotType"}
                                name="type"
                                state={props.type}
                                readonly={true}/>
                        </b>

                    </Grid>
                    <Grid item md={2} lg={2} xl={2}>
                        <TextEditFinanceo
                            className={props.type === "Account" ? "accountType" : "depotType"}
                            name="bank"
                            state={props.bank}
                            setState={updateAccount}
                            referenceValue={props.index}
                            onSave={onSaveValues}
                        />
                    </Grid>
                    <Grid item md={3} lg={3} xl={3}>
                        <TextEditFinanceo
                            className={props.type === "Account" ? "accountType" : "depotType"}
                            name="iban"
                            state={props.iban}
                            setState={updateAccount}
                            referenceValue={props.index}
                            validation={ibanValidation}
                            formatDisplayFunction={ibanDisplayFunction}
                            onSave={onSaveValues}
                        />
                    </Grid>
                    <Grid item md={2} lg={2} xl={2}>
                        <TextEditFinanceo
                            className={props.type === "Account" ? "accountType" : "depotType"}
                            name="bic"
                            state={props.bic}
                            setState={updateAccount}
                            referenceValue={props.index}
                            validation={BICValidation}
                            onSave={onSaveValues}
                        />
                    </Grid>
                    <Grid item md={2} lg={2} xl={2}>
                        <TextEditFinanceo
                            className={props.type === "Account" ? "accountType" : "depotType"}
                            name="owner"
                            state={props.owner}
                            setState={updateAccount}
                            referenceValue={props.index}
                            onSave={onSaveValues}
                        />
                    </Grid>
                    <Tooltip placement="left" title={"Delete account No. '" + index + "'"}>
                        <Grid item md={1} lg={1} xl={1} sx={{textAlign: "center"}}>
                            <IconButton onClick={() => setDeleteDialogOpen(true)} aria-label="open account view">
                                <DeleteForeverIcon sx={{color: COLORS.SCHEME.error}}/>
                            </IconButton>
                        </Grid>
                    </Tooltip>
                </Grid>

            }
            {
                mobileScreenSize &&
                <Accordion
                    disableGutters={true}
                    expanded={expanded === 'panel1'}
                    onChange={handlePanelChangeMobile('panel1')}
                    elevation={2}>
                    <AccordionSummary
                        sx={styleAccordionSummary}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Tooltip placement="right" title={"Type: " + (props.type !== null && props.type)}>
                            <b>
                                <TextEditFinanceo
                                    className={props.type === "Account" ? "accountType" : "depotType"}
                                    name="bank"
                                    state={props.bank}
                                    setState={updateAccount}
                                    referenceValue={props.index}
                                    onSave={onSaveValues}
                                    showEditButton={true}
                                />

                            </b>
                        </Tooltip>
                    </AccordionSummary>

                    <AccordionDetails>
                        <div className="accordionDetails">
                            <Grid container spacing={0} alignItems="center" justifyItems="center">
                                <Grid item xs={2} sm={2}>
                                    <CategoryOutlinedIcon fontSize="medium"/>&nbsp;
                                </Grid>
                                {
                                    !miniScreenSize &&
                                    <Grid item xs={3} sm={3}>
                                        <b><p>Type</p></b>
                                    </Grid>
                                }
                                <Grid item xs={miniScreenSize ? 10 : 7} sm={7}>
                                    <TextEditFinanceo
                                        name="type"
                                        state={props.type}
                                        readonly={true}
                                    />
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container spacing={0} alignItems="center" justifyItems="center">
                                <Grid item xs={2} sm={2}>
                                    <CreditCardIcon fontSize="medium"/>&nbsp;
                                </Grid>
                                {
                                    !miniScreenSize &&
                                    <Grid item xs={3} sm={3}>
                                        <b><p>IBAN</p></b>
                                    </Grid>
                                }
                                <Grid item xs={miniScreenSize ? 10 : 7} sm={7}>
                                    <TextEditFinanceo
                                        name="iban"
                                        state={props.iban}
                                        setState={updateAccount}
                                        referenceValue={props.index}
                                        validation={ibanValidation}
                                        formatDisplayFunction={ibanDisplayFunction}
                                        onSave={onSaveValues}
                                    />
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container spacing={0} alignItems="center" justifyItems="center">
                                <Grid item xs={2} sm={2}>
                                    <FingerprintIcon fontSize="medium"/>&nbsp;
                                </Grid>
                                {
                                    !miniScreenSize &&
                                    <Grid item xs={3} sm={3}>
                                        <b><p>BIC</p></b>
                                    </Grid>
                                }
                                <Grid item xs={miniScreenSize ? 10 : 7} sm={7}>
                                    <TextEditFinanceo
                                        name="bic"
                                        state={props.bic}
                                        setState={updateAccount}
                                        referenceValue={props.index}
                                        validation={BICValidation}
                                        onSave={onSaveValues}
                                    />
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container spacing={0} alignItems="center" justifyItems="center">
                                <Grid item xs={2} sm={2}>
                                    <PersonIcon fontSize="medium"/>&nbsp;
                                </Grid>
                                {
                                    !miniScreenSize &&
                                    <Grid item xs={3} sm={3}>
                                        <b><p>Owner</p></b>
                                    </Grid>
                                }

                                <Grid item xs={miniScreenSize ? 10 : 7} sm={7}>
                                    <TextEditFinanceo
                                        name="owner"
                                        state={props.owner}
                                        setState={updateAccount}
                                        referenceValue={props.index}
                                        onSave={onSaveValues}
                                    />
                                </Grid>
                            </Grid>

                            <Divider />
                            <Spacer marginTop="10px"/>

                            <Grid container spacing={0} alignItems="center" justifyItems="center">
                                <Grid item xs={12} sm={12}>
                                    <Button
                                        onClick={() => setDeleteDialogOpen(true)}
                                        variant="contained"
                                        color="error"
                                        startIcon={<DeleteForeverIcon />}
                                        fullWidth>
                                        <Typography>Delete</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </AccordionDetails>
                </Accordion>
            }
            {
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    PaperComponent={PaperComponent}
                    aria-labelledby="Delete Account / Depot">
                    <DialogTitle id="title Delete Account / Depot" style={{color: COLORS.SCHEME.warn}}>
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