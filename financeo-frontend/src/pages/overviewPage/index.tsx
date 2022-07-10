import React, {useEffect} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService"
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {Divider} from "@mui/material";
import { Select, Option } from "../../components/utils"

const years: number[] = [2018,2019, 2020,2021,2022,2023,2024,2025,2026,2027,2028,2029];

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

const createYearOptions = (years: number[]): Option[] => {
    return years.map((year) => {
        return ({value: year, label: year.toString()})
    })
}

const OverviewPage = () => {
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) return;
    }, [loading])

    return (
        <>
            <Box>
                <Container maxWidth="xl">
                    <Select id={"select-month"} label={"Month"} options={months} defaultValue="April" />
                    <Select id={"select-year"} label={"Year"} options={createYearOptions(years)} defaultValue="April" />
                </Container>
            </Box>

            <Divider />
        </>
    )
};

export default OverviewPage;
