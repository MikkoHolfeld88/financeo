import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {SCHEME1, SCHEME2} from "../../constants/colors";
import {Button, Grid, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export function ControlledAccordions() {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const styleButton = {
        padding: "14px",
        border: "2px solid",
        borderRadius: "4px",
        color: "white",
        backgroundColor: SCHEME2.lightdark
    }

    const styleAccordionSummary = {
        // border: "2px grey solid",
        // borderRadius: "4px"
    }

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={1} md={1} xl={1}>

                </Grid>
                <Grid item xs={1} md={1} xl={1}>

                </Grid>
                <Grid item xs={10} md={10} xl={10}>
                    <Accordion
                        expanded={expanded === 'panel1'}
                        onChange={handleChange('panel1')}
                        elevation={0}>
                        <AccordionSummary
                            sx={styleAccordionSummary}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header">
                            <Typography>
                                Kreissparkasse Koeln
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                Aliquam eget maximus est, id dignissim quam.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>

        </div>
    );
}

const AccountsAndDepots = () => {
    return (
        <>
            <h1>Accounts and Depots</h1>
            <ControlledAccordions />
        </>

    )
}

export default AccountsAndDepots;