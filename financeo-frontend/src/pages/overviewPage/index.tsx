import React, {useEffect} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService"
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {Divider} from "@mui/material";
import {SelectFinanceo, Option, ISelectFinanceoProps} from "../../components/utils"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import { bindActionCreators } from 'redux'
import {changeYear} from "../../store/slices/yearPickerSlice";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const years: number[] = [2018,2019, 2020,2021,2022,2023,2024,2025,2026,2027,2028,2029];
//
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
    const [ loading ] = useAuthState(auth);
    const year = useSelector((state: RootState) => state.yearPicker.value);
    const dispatch = useDispatch();
    const month = useSelector((state: RootState) => state.monthPicker.value);

    useEffect(() => {
        if (loading) return;
    }, [loading])

    return (
        <>
            <Box>
                <Container maxWidth="xl">
                    <SelectFinanceo
                        label="Year"
                        options={createYearOptions(years)}
                        setState={changeYear}
                        state={year}/>
                </Container>
            </Box>

            <Divider />
        </>
    )
};

export default OverviewPage;
