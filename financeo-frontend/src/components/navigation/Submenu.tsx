import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import {Grid} from "@mui/material";

export default function Submenu(props: any) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="icon position tabs example"
            >
                        <Tab icon={<PhoneIcon />} iconPosition="start" label="start" />
                        <Tab icon={<PhoneMissedIcon />} iconPosition="start" label="start" />
                        <Tab icon={<FavoriteIcon />} iconPosition="start" label="end" />
                        <Tab icon={<PersonPinIcon />} iconPosition="start" label="bottom" />
            </Tabs>
    );
}

