import * as React from 'react';
import {Fragment, useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CategoryIcon from '@mui/icons-material/Category';
import Box from "@mui/material/Box";
import AccountsAndDepots from "./AccountsAndDepots/AccountsAndDepots";
import BankersOrders from "./BankersOrders/BankersOrders";
import EarningsAndExpenses from "./EarningsAndExpenses/EarningsAndExpenses";
import Savings from "./Savings/Savings";
import Categories from "./Categories/Categories";
import Container from "@mui/material/Container";
import {Divider, Tooltip} from '@mui/material';
import {useSelector} from "react-redux";
import {RootState, updatePanel, useAppDispatch} from "../../store";
import {fetchAccountingCategories} from "../../store/slices/accountingCategory/accountingCategorySlice";
import {STATUS, Status} from "../../types/general";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`accounting-submenu-${index}`}>
            {value === index && (
                <Box>
                    <React.Fragment>{children}</React.Fragment>
                </Box>
            )}
        </div>
    );
}

export default function Submenu() {
    const dispatch = useAppDispatch();
    const uid = useSelector((state: RootState) => state.login.uid);
    const appConfig = useSelector((state: RootState) => state.appConfig);
    const accountingCategoryStatus: Status = useSelector((state: RootState) => state.accountingCategory.status);

    useEffect(() => {
        if (accountingCategoryStatus === STATUS.SUCCEEDED) {
            dispatch(fetchAccountingCategories(uid))
        }
    }, [])

    return (
        <Fragment>
            <Container maxWidth="xl">
                <Tabs
                    value={appConfig.accountingPanel.panel}
                    variant="scrollable"
                    onChange={(event, newValue) => {
                        dispatch(updatePanel(newValue))
                    }}
                    aria-label="Submenu of Accounting"
                    scrollButtons="auto"
                    allowScrollButtonsMobile={true}>
                    <Tooltip followCursor placement="top"
                             title={"Overview of accounts and\n account details"}
                             disableHoverListener={appConfig.toolTipsEnabled}>
                        <Tab icon={<AccountBalanceWalletIcon/>}
                             iconPosition="start"
                             label="Accounts / Depots"
                             style={{fontSize: "10px"}}/>
                    </Tooltip>
                    <Tooltip followCursor placement="top"
                             title={"Manage earnings and expenses of different accounts"}
                             disableHoverListener={appConfig.toolTipsEnabled}>
                        <Tab icon={<PointOfSaleIcon/>}
                             iconPosition="start"
                             label="Earnings / Expenses"
                             style={{fontSize: "10px"}}/>
                    </Tooltip>
                    <Tooltip followCursor placement="top"
                             title={"Check your bankers orders and automated transactions"}
                             disableHoverListener={appConfig.toolTipsEnabled}>
                        <Tab icon={<ReceiptLongIcon/>}
                             iconPosition="start"
                             label="Banker's orders"
                             style={{fontSize: "10px"}}/>
                    </Tooltip>
                    <Tooltip followCursor placement="top"
                             title={"Get a glimpse of your savings and passive income sources"}
                             disableHoverListener={appConfig.toolTipsEnabled}>
                        <Tab icon={<SavingsIcon/>}
                             iconPosition="start"
                             label="Savings"
                             style={{fontSize: "10px"}}/>
                    </Tooltip>
                    <Tooltip followCursor placement="right"
                             title={"Manage and organize your initialCategories"}
                             disableHoverListener={appConfig.toolTipsEnabled}>
                        <Tab icon={<CategoryIcon/>}
                             iconPosition="start"
                             label="Categories"
                             style={{fontSize: "10px"}}/>
                    </Tooltip>
                </Tabs>
            </Container>

            <Divider/>

            <Container maxWidth="xl">
                <TabPanel value={appConfig.accountingPanel.panel} index={0}><AccountsAndDepots/></TabPanel>
                <TabPanel value={appConfig.accountingPanel.panel} index={1}><EarningsAndExpenses/></TabPanel>
                <TabPanel value={appConfig.accountingPanel.panel} index={2}><BankersOrders/></TabPanel>
                <TabPanel value={appConfig.accountingPanel.panel} index={3}><Savings/></TabPanel>
                <TabPanel value={appConfig.accountingPanel.panel} index={4}><Categories/></TabPanel>
            </Container>
        </Fragment>
    );
}

