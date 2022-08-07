import React, {useEffect, useRef} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService/firebaseService"
import Container from "@mui/material/Container";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Tooltip
} from "@mui/material";
import {Option, PaperComponent, SelectFinanceo} from "../../components/utils"
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {adjustPickedAccounts, changeMonth, changePickedAccounts, changeYear, resetCSVUploaderState} from "../../store";
import moment from "moment";
import {IAccountProps} from "../../components/account/Account";
import {addAllData} from "../../services/databaseService/databaseService";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "../../theme";
import "./style.scss"
import CSVUploader from "../../components/overview/CSVUploader";
import CSVMapper from '../../components/overview/CSVMapper';
import {useResize} from "../../hooks/useResize";

const selectStyle = {
    margin: "0px 0px 0px 0px",
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

export type AccountOption = {
    value: any | undefined,
    label: string | any,
    id: string | any,
}

const createAccountOptions = (accounts: IAccountProps[]): AccountOption[] => {
    const options: AccountOption[] = accounts.map((account, index) => {
        return {
            value: account?.bank + " (" + (index + 1) + ")",
            label: account?.bank,
            id: account?.id
        }
    });

    return options;
}

const OverviewPage = () => {
    const dispatch = useAppDispatch();
    const [loading] = useAuthState(auth);
    const mdScreenSize = useMediaQuery(theme.breakpoints.up('md'));
    const lgScreenSize = useMediaQuery(theme.breakpoints.up('lg'));
    const [uploadedFilename, setUploadedFilename] = React.useState("");
    const [openMappingDialog, setOpenMappingDialog] = React.useState(false);
    const uid = useSelector((state: RootState) => state.login.uid);
    const year = useSelector((state: RootState) => state.yearPicker.value);
    const month = useSelector((state: RootState) => state.monthPicker.value);
    const accounts = useSelector((state: RootState) => state.accounts.data);
    const pickedAccountStatus: string = useSelector((state: RootState) => state.accountPicker.status);
    const pickedAccounts: string | string[] = useSelector((state: RootState) => state.accountPicker.value);

    const closeMappingDialog = () => {
        dispatch(resetCSVUploaderState());
        setOpenMappingDialog(false);
        setUploadedFilename("CSV");
    }

    useEffect(() => {
        if (loading) return;
    }, [loading]);

    useEffect(() => {
        if (pickedAccountStatus !== "idle") {
            if (pickedAccounts.length > accounts.length) {
                dispatch(adjustPickedAccounts({accounts}));
            }
            addAllData("pickedAccounts", uid, {pickedAccounts})
        }
    }, [pickedAccounts]);


    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <Container maxWidth="xl">
                <Container className="overviewHeader" maxWidth="xl" style={{display: "flex"}}>

                    <Grid container columnSpacing={0} rowSpacing={0.8}
                          justifyContent={!mdScreenSize ? "center" : "flex-start"}>
                        <Grid item style={{marginLeft: "4px"}}>
                            <SelectFinanceo
                                aria-label="year"
                                label="Year"
                                options={createYearOptions(calculateYears())}
                                setState={changeYear}
                                state={year}
                                style={selectStyle}/>
                        </Grid>
                        <Grid item style={{marginLeft: "4px"}}>
                            <SelectFinanceo
                                aria-label="month"
                                label="Month"
                                options={months}
                                setState={changeMonth}
                                state={month}
                                style={selectStyle}/>
                        </Grid>
                        <Grid item style={{marginLeft: "4px"}}>
                            <FormControl sx={{width: mdScreenSize ? "200px" : "170px"}}>
                                <InputLabel id="Accounts and Depots Picker Input Label">Accounts/Depots</InputLabel>
                                <Select
                                    aria-label="Accounts and Depots Picker"
                                    labelId="Accounts and Depots Picker LabelID"
                                    id="Accounts and Depots Picker ID"
                                    multiple
                                    value={pickedAccounts ? pickedAccounts : []}
                                    onChange={(event) => dispatch(changePickedAccounts(event.target.value))}
                                    input={<OutlinedInput label="Accounts/Depots"/>}>
                                    {
                                        accounts && createAccountOptions(accounts).map((accountOptions, index) => (
                                            <MenuItem
                                                key={accountOptions.id}
                                                value={accountOptions.value + "[ID:" + accountOptions.id + "]"}>
                                                {accountOptions.label + " (" + (index + 1) + ")"}
                                            </MenuItem>))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        {
                            !mdScreenSize &&
                            <Grid item style={{marginLeft: "4px"}}>
                                <CSVUploader
                                    filename={uploadedFilename}
                                    setFilename={setUploadedFilename}
                                    setCsvUploaded={setOpenMappingDialog}/>
                            </Grid>
                        }
                    </Grid>

                    {   // for mobile screen size
                        mdScreenSize &&
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <CSVUploader
                                    filename={uploadedFilename}
                                    setFilename={setUploadedFilename}
                                    setCsvUploaded={setOpenMappingDialog}/>
                            </Grid>
                        </Grid>
                    }

                </Container>
            </Container>

            <Divider/>

            <Dialog
                maxWidth="xl"
                fullWidth={true}
                open={openMappingDialog}
                onClose={() => setOpenMappingDialog(false)}
                PaperComponent={PaperComponent}
                aria-labelledby="CSV Data Mapping Dialog">
                <DialogTitle id="CSV Data Mapping Dialog Title">
                    {uploadedFilename}
                </DialogTitle>
                <DialogContent>
                    <div style={{width: "100%", height: "500px"}} >
                        <DialogContentText>Connect
                            <Tooltip className="pointer"  placement="bottom" title="Source-nodes represent column-names of incoming CSV data.">
                                <b> source-nodes </b>
                            </Tooltip>
                                to
                            <Tooltip className="pointer" placement="bottom" title="Target-nodes represent the columns of the table to be completed.">
                                <b> target-nodes </b>
                            </Tooltip>
                                to provide a correct datatranser.</DialogContentText>
                        <CSVMapper/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeMappingDialog()}>Disagree</Button>
                    <Button onClick={() => closeMappingDialog()} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
};

export default OverviewPage;
