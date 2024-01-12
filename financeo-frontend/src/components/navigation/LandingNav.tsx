import React from "react";
import {AppBar, styled, Tab, Tabs} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import theme from "../../theme"

const CustomTab = styled(Tab)(() => ({
    '&:hover': {
        color: theme.palette.primary.main,
    }
}));

const LandingNav = () => {
    return (
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
            <Toolbar sx={{ justifyContent: 'center' }}>
                <Tabs>
                    <CustomTab label="Produkt"/>
                    <CustomTab label="Use Case"/>
                    <CustomTab label="Preise"/>
                    <CustomTab label="Ressourcen"/>
                </Tabs>
            </Toolbar>
        </AppBar>
    )
}

export default LandingNav;
