import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Divider, Grid} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextEditFinanceo from "../../utils/TextEditFinanceo";
import {updateAccount} from "../../../store";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PersonIcon from "@mui/icons-material/Person";
import {Spacer} from "../../../pages/accountingPage/AccountsAndDepots/AccountsAndDepots";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import * as COLORS from "../../../constants/colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import {IAccountComponentProps} from "./AccountDesktop";
import {TooltipFinanceo} from "../../utils/TooltipFinanceo";

const AccountMobile = (props: IAccountComponentProps) => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const miniScreenSize = useMediaQuery('(max-width:492px)');

    const handlePanelChangeMobile = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const styleAccordionSummary = {
        border: "1px " + COLORS.SCHEME.foreground + " solid",
        borderRadius: "4px",
    }

    const ibanDisplayFunction = (iban: string) => {
        return iban.replace(/[a-zA-Z0-9_]{4}(?=.)/g, '$& ')
    }

    return (
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
                <TooltipFinanceo placement="right" title={"Type: " + (props.type !== null && props.type)}>
                    <b>
                        <TextEditFinanceo
                            className={props.getAccountStyle()}
                            name="bank"
                            state={props.bank}
                            setState={updateAccount}
                            referenceValue={props.index}
                            onSave={props.onSaveValues}
                            showEditButton={true}
                        />

                    </b>
                </TooltipFinanceo>
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

                    <Divider/>

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
                                validation={props.ibanValidation}
                                formatDisplayFunction={ibanDisplayFunction}
                                onSave={props.onSaveValues}
                            />
                        </Grid>
                    </Grid>

                    <Divider/>

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
                                validation={props.bicValidation}
                                onSave={props.onSaveValues}
                            />
                        </Grid>
                    </Grid>

                    <Divider/>

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
                                onSave={props.onSaveValues}
                            />
                        </Grid>
                    </Grid>

                    <Divider/>

                    <Spacer marginTop="10px"/>

                    <Grid container spacing={0} alignItems="center" justifyItems="center">
                        <Grid item xs={12} sm={12}>
                            <Button
                                onClick={() => props.setDeleteDialogOpen(true)}
                                variant="outlined"
                                color="warning"
                                startIcon={<DeleteForeverIcon/>}
                                fullWidth>
                                <Typography>Delete</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default AccountMobile;
