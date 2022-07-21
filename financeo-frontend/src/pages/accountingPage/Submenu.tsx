import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountsAndDepots from "./AccountsAndDepots";
import BankersOrders from "./BankersOrders";
import EarningsAndSpendings from "./EarningsAndSpendings";
import Savings from "./Savings";
import Container from "@mui/material/Container";
import { Divider } from '@mui/material';

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
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <React.Fragment>{children}</React.Fragment>
                </Box>
            )}
        </div>
    );
}

export default function Submenu(props: any) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    //TODO: Add Layout for Responsive Design or find a solution for missing scroll buttons
    return (
        <>
            <Container maxWidth="xl">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Submenu of Accounting"
                    scrollButtons={true}
                    allowScrollButtonsMobile
                >
                    <Tab icon={<AccountBalanceWalletIcon/>} iconPosition="start" label="Accounts / Depots" style={{fontSize: "10px"}}/>
                    <Tab icon={<PointOfSaleIcon/>} iconPosition="start" label="Earnings / Spendings" style={{fontSize: "10px"}}/>
                    <Tab icon={<ReceiptLongIcon/>} iconPosition="start" label="Banker's orders" style={{fontSize: "10px"}}/>
                    <Tab icon={<SavingsIcon/>} iconPosition="start" label="Savings" style={{fontSize: "10px"}}/>
                </Tabs>
            </Container>

            <Divider />

            <Container maxWidth="xl">
                <TabPanel value={value} index={0}><AccountsAndDepots /></TabPanel>
                <TabPanel value={value} index={1}><EarningsAndSpendings /></TabPanel>
                <TabPanel value={value} index={2}><BankersOrders /></TabPanel>
                <TabPanel value={value} index={3}><Savings /></TabPanel>
            </Container>
        </>
    );
}

