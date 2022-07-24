import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Grid, Tooltip} from "@mui/material";
import TextEditFinanceo from "../utils/TextEditFinanceo";
import "./index.scss";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from "@mui/material/Typography";
import {updateAccount} from "../../store";

const ibantools = require('ibantools');

export interface IAccountProps {
    id: number,
    type: "Account" | "Depot" | null,
    bank?: string,
    iban: string,
    bic?: string,
    owner?: string,
    created?: Date
}

export default function Account(props: IAccountProps) {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const theme = useTheme();
    const desktopScreenSize = useMediaQuery(theme.breakpoints.up('md'));

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
    const openAccountView = () => {
        console.log("open account view");

    }
    const deleteAccount = () => {
        console.log("delete Account");
    }

    const styleAccordionSummary = {
        border: "1px grey solid",
        borderRadius: "4px"
    }

    const handlePanelChangeMobile = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            {
                desktopScreenSize &&
                <Grid container spacing={2}>
                    <Grid item md={1} lg={1} xl={1}>
                        <TextEditFinanceo
                            name="id"
                            state={(props.id + 1).toString()}
                            readonly={true}
                        />
                    </Grid>
                    <Grid item md={1} lg={1} xl={1}>
                        <TextEditFinanceo
                            name="type"
                            state={props.type}
                            readonly={true}
                        />
                    </Grid>
                    <Grid item md={2} lg={2} xl={2}>
                        <TextEditFinanceo
                            name="bank"
                            state={props.bank}
                            setState={updateAccount}
                            referenceValue={props.id}
                        />
                    </Grid>
                    <Grid item md={3} lg={3} xl={3}>
                        <TextEditFinanceo
                            name="iban"
                            state={props.iban}
                            referenceValue={props.id}
                            validation={ibanValidation}
                            formatDisplayFunction={ibanDisplayFunction}
                        />
                    </Grid>
                    <Grid item md={2} lg={2} xl={2}>
                        <TextEditFinanceo
                            name="bic"
                            state={props.bic}
                            referenceValue={props.id}
                            validation={BICValidation}
                        />
                    </Grid>
                    <Grid item md={2} lg={2} xl={2}>
                        <TextEditFinanceo
                            name="owner"
                            state={props.owner}
                            referenceValue={props.id}
                        />
                    </Grid>
                    <Tooltip title={"Delete account No. '" + props.id + "'"}>
                        <Grid item md={1} lg={1} xl={1} sx={{textAlign: "center"}}>
                            <IconButton onClick={deleteAccount} aria-label="open account view">
                                <DeleteForeverIcon sx={{color: "red"}}/>
                            </IconButton>
                        </Grid>
                    </Tooltip>
                </Grid>
            }
            {
                mobileScreenSize &&
                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handlePanelChangeMobile('panel1')}
                    elevation={0}>
                    <AccordionSummary
                        sx={styleAccordionSummary}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Typography>
                            <b>{props.bank}</b>
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