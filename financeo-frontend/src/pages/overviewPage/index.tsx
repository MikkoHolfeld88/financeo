import React, {useEffect} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService"
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {Divider} from "@mui/material";
import {Option, SelectFinanceo} from "../../components/utils"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {changeMonth, changeYear} from "../../store";
import "./style.scss"
import moment from "moment";



const years: number[] = [2018,2019, 2020,2021,2022,2023,2024,2025,2026,2027,2028,2029];

const months: Option[] = [
    {value: 0, label: "January"},
    {value: 1, label: "February"},
    {value: 2, label: "March"},
    {value: 3, label: "April"},
    {value: 4, label: "May"},
    {value: 5, label: "June"},
    {value: 6, label: "July"},
    {value: 7, label: "August"},
    {value: 8, label: "September"},
    {value: 9, label: "October"},
    {value: 10, label: "November"},
    {value: 11, label: "December"},
];

const calculateYears = (pastYears: number = 10): number[] => {
    const latestYear = moment().year();
    const firstYear = moment().year() - pastYears;

    const range = (start: number, end: number): number[] => {
        for (var i = start, list = []; i <= end; list.push(i), i++);
        return list;
    };

    return range(firstYear, latestYear);
}

const createYearOptions = (years: number[]): Option[] => {
    return years.map((year) => {
        return ({value: year, label: year.toString()})
    })
}

const OverviewPage = () => {
    const [ loading ] = useAuthState(auth);
    const month = useSelector((state: RootState) => state.monthPicker.value);
    const year = useSelector((state: RootState) => state.yearPicker.value);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loading) return;
    }, [loading])

    return (
        <>
            <Box>
                <Container maxWidth="xl" className="overviewHeader">
                    <SelectFinanceo
                        label="Year"
                        options={createYearOptions(calculateYears())}
                        setState={changeYear}
                        state={year}/>
                    <SelectFinanceo
                        label="Month"
                        options={months}
                        setState={changeMonth}
                        state={month}/>
                </Container>
            </Box>

            <Divider />
        </>
    )
};

export default OverviewPage;
