import React, {useEffect, useRef} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService/firebaseService"
import Container from "@mui/material/Container";
import {
    Alert,
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
import {
    adjustPickedAccounts,
    changeMonth,
    changePickedAccounts,
    changeYear, resetCSVMapperState,
    resetCSVUploaderState, resetEdges,
    setEdges, mapData, setHead, setAccountName, ICSVUploaderProps
} from "../../store";
import moment from "moment";
import {IAccountProps} from "../../components/account/Account";
import {addAllData, addData, updateData} from "../../services/databaseService/databaseService";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "../../theme";
import "./style.scss"
import CSVUploader from "../../components/overview/CSVUploader";
import CSVMapper, {createHead} from '../../components/overview/CSVMapper';
import {useResize} from "../../hooks/useResize";
import {ICSVMapperProps} from "../../store/slices/CSVMapperSlice";
import Snackbar from "@mui/material/Snackbar";
import {randomUUID} from "crypto";

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
    return accounts.map((account, index) => {
        return {
            value: account?.bank + " (" + (index + 1) + ")",
            label: account?.bank,
            id: account?.id
        }
    });
}

export type BasicAccountOption = {
    value: string,
    label: string | any,
}

const createBasicAccountOptions = (accounts: IAccountProps[]): BasicAccountOption[] => {
    return accounts.map((account, index) => {
        return {
            value: account.id,
            label: account?.bank
        }
    });
}

const OverviewPage = () => {
    const dispatch = useAppDispatch();
    const [loading] = useAuthState(auth);
    const mdScreenSize = useMediaQuery(theme.breakpoints.up('md'));
    const [uploadedFilename, setUploadedFilename] = React.useState("");
    const [openMappingDialog, setOpenMappingDialog] = React.useState(false);
    const [cantUpload, setCantUpload] = React.useState(false);
    const uid = useSelector((state: RootState) => state.login.uid);
    const year = useSelector((state: RootState) => state.yearPicker.value);
    const month = useSelector((state: RootState) => state.monthPicker.value);
    const accounts = useSelector((state: RootState) => state.accounts.data);
    const selectedEdges = useSelector((state: RootState) => state.CSVMapper.edges);
    const accountId = useSelector((state: RootState) => state.CSVUploader.accountId);
    const mappedData = useSelector((state: RootState) => state.CSVUploader.mappedData);
    const pickedAccounts: string | string[] = useSelector((state: RootState) => state.accountPicker.value);
    const pickedAccountStatus: string = useSelector((state: RootState) => state.accountPicker.status);
    const accountingData = useSelector((state: RootState) => state.accountingData.value);

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

    useEffect(() => { // save mappedData to database on notice
        if (mappedData.length > 0) {

            const mappedAccountingData = {[accountId]: {
                    data: mappedData,
                    created: moment().toISOString(),
                    accountName: accounts.find((account: IAccountProps) => account.id === accountId)?.bank
                }
            };

            updateData("accountingData", uid, {mappedAccountingData});
            dispatch(resetCSVUploaderState())
        };
    }, [mappedData])

    const onUploadClick = () => {
        if(accountId === " " || accountId === ""){ // did not chose account
            setCantUpload(true);
        } else {
            dispatch(setHead(createHead()));
            dispatch(mapData(selectedEdges));
            dispatch(resetCSVMapperState());
            setOpenMappingDialog(false);
            setUploadedFilename("CSV");
        }
    }

    const closeMappingDialog = () => {
        dispatch(resetCSVUploaderState());
        dispatch(resetCSVMapperState());
        setOpenMappingDialog(false);
        setUploadedFilename("CSV");
    }

    function onResetEdges(){
        dispatch(resetEdges());
    }

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
                maxWidth="md"
                fullWidth={true}
                open={openMappingDialog}
                onClose={() => setOpenMappingDialog(false)}
                PaperComponent={PaperComponent}
                aria-labelledby="CSV Data Mapping Dialog">
                <DialogTitle id="CSV Data Mapping Dialog Title">
                    {uploadedFilename}
                </DialogTitle>
                <DialogContent>
                    <Grid container
                          justifyContent="space-between"
                          alignItems="center">
                        <Grid item>
                            <DialogContentText>
                                Connect
                                <Tooltip className="pointer"  placement="bottom" title="Source-nodes represent column-names of incoming CSV data.">
                                    <b> source-nodes </b>
                                </Tooltip>
                                to
                                <Tooltip className="pointer" placement="bottom" title="Target-nodes represent the columns of the table to be completed.">
                                    <b> target-nodes </b>
                                </Tooltip>
                                to provide a correct datatransfer.
                            </DialogContentText>
                        </Grid>
                        <Grid item>
                            <Button size="small" variant="outlined" onClick={onResetEdges}>Reset edges</Button>
                        </Grid>
                    </Grid>

                    <div style={{height: "500px", border: "solid 1px lightgrey", borderRadius: "4px", marginTop: "5px"}}>
                        <CSVMapper/>
                    </div>

                </DialogContent>
                <SelectFinanceo
                    aria-label="accountName"
                    label="Account Name"
                    options={createBasicAccountOptions(accounts)}
                    setState={setAccountName}
                    state={accountId}
                    error={{
                        active: cantUpload,
                        message: "Please select an account."
                    }}
                    style={{marginLeft: "25px", marginRight: "25px"}}/>
                <DialogActions>
                    <Button onClick={() => closeMappingDialog()}>Cancel</Button>
                    <Button onClick={() => onUploadClick()} autoFocus>Upload</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                autoHideDuration={5000}
                open={cantUpload}
                onClose={() => setCantUpload(false)}>
                <Alert severity={"error"}>You need to select an account that matches your data!</Alert>
            </Snackbar>

        </>
    )
};

export default OverviewPage;
