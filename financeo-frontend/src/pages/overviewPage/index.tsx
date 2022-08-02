import React, {useEffect} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService/firebaseService"
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import {Option, SelectFinanceo} from "../../components/utils"
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {changeMonth, changePickedAccounts, changeYear} from "../../store";
import "./style.scss"
import moment from "moment";
import {IAccountProps} from "../../components/account/Account";
import {addData} from "../../services/databaseService/databaseService";

const selectStyle = {
    margin: "0px 4px 0px 4px",
}

const months: Option[] = [
    {value: 1, label: "January"},
    {value: 2, label: "February"},
    {value: 3, label: "March"},
    {value: 4, label: "April"},
    {value: 5, label: "May"},
    {value: 6, label: "June"},
    {value: 7, label: "July"},
    {value: 8, label: "August"},
    {value: 9, label: "September"},
    {value: 10, label: "October"},
    {value: 11, label: "November"},
    {value: 12, label: "December"},
];

const calculateYears = (pastYears: number = 10): number[] => {
    const latestYear = moment().year();
    const firstYear = moment().year() - pastYears;

    const range = (start: number, end: number): number[] => {
        for (var i = start, list = []; i <= end; list.push(i), i++) ;
        return list.reverse();
    };

    return range(firstYear, latestYear);
}

const createYearOptions = (years: number[]): Option[] => {
    return years.map((year) => {
        return ({value: year, label: year.toString()})
    })
}

const createAccountOptions = (accounts: IAccountProps[]): Option[] => {
    const options: Option[] = accounts.map((account, index) => {
        return {
            value: account?.bank + " (" + (index + 1) + ")",
            label: account?.bank
        }
    });

    return options;

}

const OverviewPage = () => {
    const [user, loading] = useAuthState(auth);
    const uid = user?.uid ? user?.uid : "none";
    const dispatch = useAppDispatch();
    const month = useSelector((state: RootState) => state.monthPicker.value);
    const year = useSelector((state: RootState) => state.yearPicker.value);
    const accounts = useSelector((state: RootState) => state.accounts.data);
    const pickedAccounts: string | string[] = useSelector((state: RootState) => state.accountPicker.value);
    const pickedAccountStatus: string = useSelector((state: RootState) => state.accountPicker.status);

    useEffect(() => {
        if (loading) return;
    }, [loading]);

    useEffect(() => {
        if (pickedAccountStatus !== "idle") {
            addData("pickedAccounts", uid, {pickedAccounts})
        }
    }, [pickedAccounts]);

    return (
        <>
            <Box>
                <Container maxWidth="xl" className="overviewHeader">
                    <SelectFinanceo
                        aria-label="year"
                        label="Year"
                        options={createYearOptions(calculateYears())}
                        setState={changeYear}
                        state={year}
                        style={selectStyle}/>

                    <SelectFinanceo
                        aria-label="month"
                        label="Month"
                        options={months}
                        setState={changeMonth}
                        state={month}
                        style={selectStyle}/>

                    <FormControl sx={{width: 200}}>
                        <InputLabel id="Accounts and Depots Picker Input Label">Accounts/Depots</InputLabel>
                        <Select
                            aria-label="Accounts and Depots Picker"
                            labelId="Accounts and Depots Picker LabelID"
                            id="Accounts and Depots Picker ID"
                            multiple
                            value={pickedAccounts}
                            onChange={(event) => dispatch(changePickedAccounts(event.target.value))}
                            input={<OutlinedInput label="Accounts/Depots"/>}>
                            {
                                accounts && createAccountOptions(accounts).map((accountOptions, index) => (
                                    <MenuItem
                                        key={accountOptions.value}
                                        value={accountOptions.value}>
                                        {accountOptions.label + " (" + (index + 1) + ")"}
                                    </MenuItem>))
                            }
                        </Select>
                    </FormControl>

                </Container>
            </Box>
            <Divider/>
        </>
    )
};

export default OverviewPage;
