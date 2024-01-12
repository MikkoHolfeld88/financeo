import React from 'react';
import { Grid, TextField, Button } from '@mui/material';

const SubscriptionForm = () => {
    return (
        <Grid container alignItems="stretch" spacing={1}>
            <Grid item xs={6} sm={8}>
                <TextField
                    style={{color: 'white'}}
                    label="E-MAIL"
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item xs={6} sm={4}>
                <Button
                    variant="contained"
                    sx={{
                        color: 'white',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%', // Stellen Sie sicher, dass der Button nicht über seine Grenzen hinauswächst
                        height: '56px', // Standardhöhe für MUI TextField, anpassen falls nötig
                    }}
                    fullWidth>
                    Subscribe
                </Button>
            </Grid>
        </Grid>
    );
};

export default SubscriptionForm;
