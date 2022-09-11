import React, {useEffect} from 'react';
import moment from "moment";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService/firebaseService"
import {addAllData, updateData} from "../../services/databaseService/databaseService";
import {Alert, Container, Divider, Grid, Snackbar, useMediaQuery} from "@mui/material";
import {useSelector} from "react-redux";
import {
    AccountingDataValueType,
    adjustPickedAccounts,
    IAccountProps, removeDuplicatePickedAccounts,
    resetCSVUploaderState,
    RootState,
    setAccountingData,
    useAppDispatch
} from "../../store";
import CSVUploader from "../../components/overview/CSVUploader";
import {CSVMappingDialog} from '../../components/overview/CSVMapper';
import AccountingDataTable from "../../components/overview/AccountingDataTable";
import YearPicker from "../../components/overview/YearPicker";
import MonthPicker from "../../components/overview/MonthPicker";
import AccountPicker from "../../components/overview/AccountPicker";
import theme from "../../theme";
import "./style.scss"

const OverviewPage = () => {
    const dispatch = useAppDispatch();
    const [loading] = useAuthState(auth);
    const mdScreenSize = useMediaQuery(theme.breakpoints.up('md'));
    const [uploadedFilename, setUploadedFilename] = React.useState("");
    const [openMappingDialog, setOpenMappingDialog] = React.useState(false);
    const [cantUpload, setCantUpload] = React.useState(false);
    const uid = useSelector((state: RootState) => state.login.uid);
    const accounts = useSelector((state: RootState) => state.accounts.data);
    const accountId = useSelector((state: RootState) => state.CSVUploader.accountId);
    const mappedData = useSelector((state: RootState) => state.CSVUploader.mappedData);
    const pickedAccounts: string | string[] = useSelector((state: RootState) => state.accountPicker.value);
    const pickedAccountStatus: string = useSelector((state: RootState) => state.accountPicker.status);
    const accountingData = useSelector((state: RootState) => state.accountingData.value);

    const justifyContentGrid = !mdScreenSize ? "center" : "flex-start";
    const gridItemStyle = {marginLeft: "4px"};

    useEffect(() => {
        if (loading) return;
    }, [loading]);

    useEffect(() => {
        if (pickedAccountStatus !== "idle") {
            if (pickedAccounts.length > accounts.length) {
                dispatch(adjustPickedAccounts({accounts}));
            }
            if(pickedAccounts.length != new Set(pickedAccounts).size) {
                dispatch(removeDuplicatePickedAccounts());
            }
            addAllData("pickedAccounts", uid, {pickedAccounts})
        }
    }, [pickedAccounts]);

    useEffect(() => {
        if (mappedData.length > 0) {
            const newAccountingData: AccountingDataValueType = createNewAccountinData();

            updateData(
                "accountingData", uid,
                accountingData ?
                    {...accountingData, ...newAccountingData} :
                    {...newAccountingData});
            dispatch(setAccountingData({...accountingData, ...newAccountingData}))
            dispatch(resetCSVUploaderState())
        }
        ;
    }, [mappedData])

    function createNewAccountinData(): AccountingDataValueType   {
        return  {
            [accountId]: {
                data: mappedData,
                created: moment().toISOString(),
                accountName: getAccountName()
            }};
    }

    function getAccountName(): string | any {
        return accounts.find((account: IAccountProps) => account.id === accountId)?.bank;
    }

    return (
        <>
            <Container maxWidth="xl">
                <Container className="overviewHeader" maxWidth="xl" style={{display: "flex"}}>
                    <Grid container columnSpacing={0} rowSpacing={0.8} justifyContent={justifyContentGrid}>
                        <Grid item style={gridItemStyle}>
                            <YearPicker />
                        </Grid>
                        <Grid item style={gridItemStyle}>
                            <MonthPicker />
                        </Grid>
                        <Grid item style={gridItemStyle}>
                            <AccountPicker />
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

            <CSVMappingDialog
                visible={openMappingDialog}
                setVisibility={setOpenMappingDialog}/>

            <AccountingDataTable />

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
