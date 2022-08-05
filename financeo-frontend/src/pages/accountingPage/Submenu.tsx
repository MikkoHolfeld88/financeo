import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Box from "@mui/material/Box";
import AccountsAndDepots from "./AccountsAndDepots";
import BankersOrders from "./BankersOrders";
import EarningsAndExpenses from "./EarningsAndExpenses";
import Savings from "./Savings";
import Container from "@mui/material/Container";
import {Divider} from '@mui/material';
import {useSelector} from "react-redux";
import {RootState, updatePanel, useAppDispatch} from "../../store";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`accounting-submenu-${index}`}
            aria-labelledby={`accounting-submenu-${index}`}
            {...other}>
            {value === index && (
                <Box>
                    <React.Fragment>{children}</React.Fragment>
                </Box>
            )}
        </div>
    );
}

export default function Submenu() {
    const panelValue = useSelector((state: RootState) => state.submenuAccounting.panel);
    const dispatch = useAppDispatch();

    return (
        <>
            <Container maxWidth="xl">
                <Tabs
                    value={panelValue}
                    variant="scrollable"
                    onChange={(event, newValue) => {dispatch(updatePanel(newValue))}}
                    aria-label="Submenu of Accounting"
                    scrollButtons="auto"
                    allowScrollButtonsMobile={true}>
                    <Tab icon={<AccountBalanceWalletIcon/>}
                         iconPosition="start"
                         label="Accounts / Depots"
                         style={{fontSize: "10px"}}/>
                    <Tab icon={<PointOfSaleIcon/>}
                         iconPosition="start"
                         label="Earnings / Spendings"
                         style={{fontSize: "10px"}}/>
                    <Tab icon={<ReceiptLongIcon/>}
                         iconPosition="start"
                         label="Banker's orders"
                         style={{fontSize: "10px"}}/>
                    <Tab icon={<SavingsIcon/>}
                         iconPosition="start"
                         label="Savings"
                         style={{fontSize: "10px"}}/>
                </Tabs>
            </Container>

            <Divider/>

            <Container maxWidth="xl">
                <TabPanel value={panelValue} index={0}><AccountsAndDepots/></TabPanel>
                <TabPanel value={panelValue} index={1}><EarningsAndExpenses/></TabPanel>
                <TabPanel value={panelValue} index={2}><BankersOrders/></TabPanel>
                <TabPanel value={panelValue} index={3}><Savings/></TabPanel>
            </Container>
        </>
    );
}

