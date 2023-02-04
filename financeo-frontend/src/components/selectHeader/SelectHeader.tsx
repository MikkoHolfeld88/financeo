import {Alert, Container, Divider, Grid, Snackbar, useMediaQuery} from "@mui/material";
import YearPicker from "./YearPicker";
import MonthPicker from "./MonthPicker";
import AccountPicker from "./AccountPicker";
import CSVUploader from "./CSVUploader";
import {CSVMappingDialog} from "./CSVMapper";
import React, {Fragment, useEffect} from "react";
import {
    AccountingData,
    AccountingDataValueType,
    adjustPickedAccounts,
    IAccountProps,
    resetCSVUploaderState,
    RootState,
    setAccountingData,
    useAppDispatch
} from "../../store";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService/firebaseService";
import theme from "../../theme";
import {useSelector} from "react-redux";
import {addAllData, updateData} from "../../services/databaseService/databaseService";
import moment from "moment";
import {FIRESTORE_COLLECTIONS} from "../../services/databaseService/colletions";

interface ISelectHeaderProps {
    yearPickerInvisible?: boolean,
    monthPickerInvisible?: boolean,
    accountPickerInvisible?: boolean,
    csvUploaderInvisible?: boolean,
}

export const SelectHeader: React.FC<ISelectHeaderProps> = props => {
    const dispatch = useAppDispatch();
    const [loading] = useAuthState(auth);
    const [cantUpload, setCantUpload] = React.useState(false);
    const mdScreenSize = useMediaQuery(theme.breakpoints.up('md'));
    const uid = useSelector((state: RootState) => state.login.uid);
    const [uploadedFilename, setUploadedFilename] = React.useState("");
    const accounts = useSelector((state: RootState) => state.accounts.data);
    const [openMappingDialog, setOpenMappingDialog] = React.useState(false);
    const accountId = useSelector((state: RootState) => state.CSVUploader.accountId);
    const mappedData = useSelector((state: RootState) => state.CSVUploader.mappedData);
    const pickedAccountStatus: string = useSelector((state: RootState) => state.accountPicker.status);
    const pickedAccountsIds: string | string[] = useSelector((state: RootState) => state.accountPicker.ids);
    const accountingData: AccountingDataValueType[] = useSelector((state: RootState) => state.accountingData.value);
    const pickedAccounts: string | string[] = useSelector((state: RootState) => state.accountPicker.pickedAccounts);

    const justifyContentGrid = !mdScreenSize ? "center" : "flex-start";
    const gridItemStyle = {marginLeft: "4px"};

    useEffect(() => {
        if (loading) return;
    }, [loading]);

    useEffect(() => {
        if (pickedAccountStatus !== "idle") {
            if (pickedAccounts
                && typeof pickedAccounts === 'object'
                && accounts
                && typeof accounts === 'object'
                && pickedAccounts.length > accounts.length
            ) {
                dispatch(adjustPickedAccounts({accounts}));
            }
            addAllData(
                FIRESTORE_COLLECTIONS.PICKED_ACCOUNTS, uid,
                {pickedAccounts: pickedAccounts, ids: pickedAccountsIds}
            )
        }
    }, [pickedAccounts]);

    useEffect(() => {
        let cleanedData: AccountingData[];
        let newAccountingData: AccountingDataValueType = {
            [accountId]: {
                data: [],
                created: moment().toISOString(),
                accountName: getAccountName()
            }
        };

        if (mappedData && mappedData.length > 0) {
            if (accountingData[accountId] && accountingData[accountId].data) {
                // merges data from database (redux store) and data from csv file and removes duplicates
                const mergedData = [...accountingData[accountId].data, ...mappedData];
                cleanedData = removeDuplicates(mergedData);
                newAccountingData[accountId].data = cleanedData;
            } else {
                newAccountingData[accountId].data = mappedData;
            }

            updateData(
                FIRESTORE_COLLECTIONS.ACCOUNTING_DATA,
                uid,
                accountingData ? {...accountingData, ...newAccountingData} : {...newAccountingData});
            dispatch(setAccountingData({...accountingData, ...newAccountingData}))
            dispatch(resetCSVUploaderState())
        }
    }, [mappedData])

    function removeDuplicates(data: AccountingData[]): AccountingData[] {
        // removes duplicate entries based on date, amount and receiver

        const uniqueData: AccountingData[] = [];
        data.forEach((item) => {
            const isDuplicate = uniqueData.some((uniqueItem) => {
                return (
                    uniqueItem.date === item.date &&
                    uniqueItem.receiver === item.receiver &&
                    uniqueItem.amount === item.amount
                );
            });
            if (!isDuplicate) {
                uniqueData.push(item);
            }
        });
        return uniqueData;
    }

    function getAccountName(): string | any {
        return accounts && accounts.find((account: IAccountProps) => account.id === accountId)?.bank;
    }

    return (
        <Fragment>
            <Container maxWidth="xl">
                <Container className="overviewHeader" maxWidth="xl" style={{display: "flex"}}>
                    <Grid container columnSpacing={0} rowSpacing={0.8} justifyContent={justifyContentGrid}>
                        <Grid item style={gridItemStyle}>
                            {!props.yearPickerInvisible && <YearPicker/>}
                        </Grid>
                        <Grid item style={gridItemStyle}>
                            {!props.monthPickerInvisible && <MonthPicker/>}
                        </Grid>
                        <Grid item style={gridItemStyle}>
                            {!props.accountPickerInvisible && <AccountPicker/>}
                        </Grid>

                        {
                            !mdScreenSize && !props.csvUploaderInvisible &&
                            <Grid item style={gridItemStyle}>
                                <CSVUploader
                                    filename={uploadedFilename}
                                    setFilename={setUploadedFilename}
                                    setCsvUploaded={setOpenMappingDialog}/>
                            </Grid>
                        }
                    </Grid>

                    {   // for mobile screen size
                        mdScreenSize && !props.csvUploaderInvisible &&
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

            <Divider sx={{position: "absolute", left: 0, width: "20000px"}}/>

            {
                !props.csvUploaderInvisible &&
                <CSVMappingDialog
                    visible={openMappingDialog}
                    setVisibility={setOpenMappingDialog}/>
            }

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
        </Fragment>
    )
}


