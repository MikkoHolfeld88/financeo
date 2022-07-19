import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {SCHEME1, SCHEME2} from "../../constants/colors";
import {Button, Fab, Grid, IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export function Account() {
    return (
        <Grid container spacing={0}>
            <Grid item xs={9} md={10} xl={10}>
                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                    elevation={4}>
                    <AccordionSummary
                        sx={styleAccordionSummary}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Typography>
                            <b>Kreissparkasse Koeln</b>
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
            <Grid item xs={2} md={1} xl={1}>
                <Tooltip title={"Delete existing account or depot"}>
                    <Fab size="medium" color="warning" aria-label="delete account or depot" style={{margin: margin}}>
                        <DeleteForeverIcon style={{color: "white"}} />
                    </Fab>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export function ControlledAccordions() {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const margin = "10px";

    const styleAccordionSummary = {
       marginTop: margin
    }

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div>
            <Tooltip title={"Add new account or depot"}>
                <Button variant="outlined" startIcon={<AddIcon />}>
                    Add Account
                </Button>
            </Tooltip>
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