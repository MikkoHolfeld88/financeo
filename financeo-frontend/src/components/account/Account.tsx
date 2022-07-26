import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Chip, Divider, Grid, Tooltip} from "@mui/material";
import TextEditFinanceo from "../utils/TextEditFinanceo";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from "@mui/material/Typography";
import {updateAccount} from "../../store";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService/firebaseService";
import * as COLORS from "../../constants/colors"
import "./index.scss";

const ibantools = require('ibantools');

export interface IAccountProps {
    id: number,
    type: "Account" | "Depot" | null,
    bank?: string,
    iban?: string,
    bic?: string
    owner?: string,
    created?: Date
}

export default function Account(props: IAccountProps) {
    const [user] = useAuthState(auth);
    const uid = user ? user.uid.toString() : 'none';
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const theme = useTheme();
    const desktopScreenSize = useMediaQuery(theme.breakpoints.up('md'));
    const accounts = useSelector((state: RootState) => state.accounts.data);

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

    const deleteAccount = () => {
        console.log("delete Account");
    }

    const styleAccordionSummary = {
        border: "1px " + COLORS.SCHEME.mainBackground + " solid",
        borderRadius: "8px"
    }

    const handlePanelChangeMobile = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const onSaveValues = {path: 'accountsAndDepots', uid: uid, updateValue: {accounts}};

    const handleChipClick = () => {}
    const accordionDisabled = false;
    const marginLeft = desktopScreenSize ? "15px" : "0px"; // different margin on desktop and mobile

    return (
        <div style={{marginLeft: marginLeft}}>
            {
                desktopScreenSize &&
                <Grid container spacing={2} alignItems="center" justifyItems="center">
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
                            <IconButton onClick={deleteAccount} aria-label="open account view">
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
                    elevation={0}>
                    <AccordionSummary
                        sx={styleAccordionSummary}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Typography
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                alignItems: "center"}}>
                            <Chip
                                style={{
                                    fontWeight: "bold",
                                    border: "1px black solid"
                                }}
                                variant="outlined"
                                label={(props.id + 1).toString()}
                                onClick={handleChipClick}/>&nbsp;

                                <TextEditFinanceo
                                    name="bank"
                                    state={props.bank}
                                    setState={updateAccount}
                                    referenceValue={props.id}
                                    onSave={onSaveValues}
                                    showEditButton={true}/>

                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography>
                            Test
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            }
        </div>
    )
}