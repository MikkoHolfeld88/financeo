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
import {updateBank} from "../../store/slices/accountsSlice";

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
    // TODO: implement screenSize recognition in a redux Slice for overall access
    const theme = useTheme();
    const desktopScreenSize = useMediaQuery(theme.breakpoints.up('md'));
    const mobileScreenSize = !desktopScreenSize;

    const handleChange = (e: any, setFn: any) => {
        setFn(e.target.value);
    };

    const [text, setText] = React.useState(
        'This is a controlled component'
    );

    const [visibleSnackbar, setSnackbarVisibility] = React.useState(
        false
    )

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setSnackbarVisibility(false);
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

    const [expanded, setExpanded] = React.useState<string | false>(false);

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
                            state={props.id.toString()}
                            readonly={true}
                            name="AccountCount"
                        />
                    </Grid>
                    <Grid item md={1} lg={1} xl={1}>
                        <TextEditFinanceo
                            state={props.type}
                            readonly={true}
                            name="AccountType"
                        />
                    </Grid>
                    <Grid item md={2} lg={2} xl={2}>
                        <TextEditFinanceo
                            state={props.bank}
                            name="NameOfBank"
                            referenceValue={props.id}
                            setState={updateBank}
                        />
                    </Grid>
                    <Grid item md={3} lg={3} xl={3}>
                        <TextEditFinanceo
                            state={props.iban}
                            name="IBANNumber"
                            validation={ibanValidation}
                            formatDisplayFunction={ibanDisplayFunction}
                        />
                    </Grid>
                    <Grid item md={2} lg={2} xl={2}>
                        <TextEditFinanceo
                            state={props.bic}
                            name="BIC/Swift"
                            validation={BICValidation}
                        />
                    </Grid>
                    <Grid item md={2} lg={2} xl={2}>
                        <TextEditFinanceo
                            state={props.owner}
                            name="Owner"
                        />
                    </Grid>
                    <Tooltip title={"Delete account " + props.id}>
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
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Typography>
                            <b>{props.bank}</b>
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                            Aliquam eget maximus est, id dignissim quam.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            }
        </div>
    )
}