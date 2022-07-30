import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Chip, Divider, Grid, Tooltip} from "@mui/material";
import TextEditFinanceo from "../utils/TextEditFinanceo";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from "@mui/material/Typography";
import {updateAccount, deleteAccount} from "../../store";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService/firebaseService";
import * as COLORS from "../../constants/colors"
import "./index.scss";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PersonIcon from '@mui/icons-material/Person';
import {Spacer} from "../../pages/accountingPage/AccountsAndDepots";

const ibantools = require('ibantools');

export interface IAccountProps {
    id: number,
    type: "Account" | "Depot" | null,
    bank?: string,
    iban?: string,
    bic?: string
    owner?: string,
    created?: string
}

export default function Account(props: IAccountProps) {
    const [user] = useAuthState(auth);
    const uid = user ? user.uid.toString() : 'none';
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const theme = useTheme();
    const desktopScreenSize = useMediaQuery(theme.breakpoints.up('md'));
    const miniScreenSize = useMediaQuery('(max-width:492px)');
    const accounts = useSelector((state: RootState) => state.accounts.data);
    const dispatch = useAppDispatch();

    const mobileScreenSize = !desktopScreenSize;
    const handleChange = (event: any, setState: any) => {
        setState(event.target.value);
    };

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
        dispatch(deleteAccount(props.id))
        console.log("delete Account");
    }

    const handlePanelChangeMobile = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const onSaveValues = {path: 'accountsAndDepots', uid: uid, updateValue: {accounts}};

    const handleChipClick = () => {}

    const marginLeft = desktopScreenSize ? "15px" : "0px"; // different margin on desktop and mobile
    const styleAccordionSummary = {
        border: "1px " + COLORS.SCHEME.foreground + " solid",
        borderRadius: "4px",
    }

    console.log(miniScreenSize);

    return (
        <div style={{marginLeft: marginLeft}}>
            {
                desktopScreenSize &&
                <Grid container spacing={2} alignItems="center" justifyItems="center" className="gridMain">
                    <Grid md={1} lg={1} xl={1} style={{textAlign: "center", marginTop: "-6px"}}>
                        <Chip
                            label={(props.id + 1).toString()}
                            variant="outlined"
                            onClick={handleChipClick}/>
                    </Grid>
                    <Grid md={1} lg={1} xl={1}>
                        <TextEditFinanceo
                            name="type"
                            state={props.type}
                            readonly={true}
                        />
                    </Grid>
                    <Grid md={2} lg={2} xl={2}>
                        <TextEditFinanceo
                            name="bank"
                            state={props.bank}
                            setState={updateAccount}
                            referenceValue={props.id}
                            onSave={onSaveValues}
                        />
                    </Grid>
                    <Grid md={3} lg={3} xl={3}>
                        <TextEditFinanceo
                            name="iban"
                            state={props.iban}
                            setState={updateAccount}
                            referenceValue={props.id}
                            validation={ibanValidation}
                            formatDisplayFunction={ibanDisplayFunction}
                            onSave={onSaveValues}
                        />
                    </Grid>
                    <Grid md={2} lg={2} xl={2}>
                        <TextEditFinanceo
                            name="bic"
                            state={props.bic}
                            setState={updateAccount}
                            referenceValue={props.id}
                            validation={BICValidation}
                            onSave={onSaveValues}
                        />
                    </Grid>
                    <Grid md={2} lg={2} xl={2}>
                        <TextEditFinanceo
                            name="owner"
                            state={props.owner}
                            setState={updateAccount}
                            referenceValue={props.id}
                            onSave={onSaveValues}
                        />
                    </Grid>
                    <Tooltip title={"Delete account No. '" + (props.id + 1) + "'"}>
                        <Grid md={1} lg={1} xl={1} sx={{textAlign: "center"}}>
                            <IconButton onClick={onDeleteAccount} aria-label="open account view">
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
                        <Typography>
                            <b>
                                <TextEditFinanceo
                                    name="bank"
                                    state={props.bank}
                                    setState={updateAccount}
                                    referenceValue={props.id}
                                    onSave={onSaveValues}
                                    showEditButton={true}
                                />
                            </b>

                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography className="accordionDetails">
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
                                        referenceValue={props.id}
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
                                        referenceValue={props.id}
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
                                        referenceValue={props.id}
                                        onSave={onSaveValues}
                                    />
                                </Grid>
                            </Grid>

                            <Divider />
                            <Spacer marginTop="10px"/>

                            <Grid container spacing={0} alignItems="center" justifyItems="center">
                                <Grid item xs={12} sm={12}>
                                    <Button
                                        onClick={onDeleteAccount}
                                        variant="contained"
                                        color="error"
                                        startIcon={<DeleteForeverIcon />}
                                        fullWidth>
                                        <Typography>Delete</Typography>
                                    </Button>
                                </Grid>
                            </Grid>



                        </Typography>
                    </AccordionDetails>
                </Accordion>
            }
        </div>
    )
}