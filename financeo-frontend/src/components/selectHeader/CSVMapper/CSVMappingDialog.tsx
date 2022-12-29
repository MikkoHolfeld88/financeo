import {useSelector} from "react-redux";
import {
    IAccountProps,
    mapData,
    resetCSVMapperState,
    resetCSVUploaderState,
    resetEdges,
    RootState, setAccountName,
    setHead,
    useAppDispatch
} from "../../../store";
import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Tooltip
} from "@mui/material";
import {PaperComponentFinanceo, SelectFinanceo} from "../../utils";
import CSVMapper, {createNodeHead} from "./CSVMapper";

export type BasicAccountOption = {
    value: string,
    label: string | any,
}

export const createBasicAccountOptions = (accounts: IAccountProps[]): BasicAccountOption[] => {
    return accounts.map((account, index) => {
        return {
            value: account.id,
            label: account?.bank
        }
    });
}

interface ICSVMappingDialogProps {
    visible: boolean;
    setVisibility: (visible: boolean) => void;
}

export default function CSVMappingDialog(props: ICSVMappingDialogProps) {
    const accounts = useSelector((state: RootState) => state.accounts.data);
    const selectedEdges = useSelector((state: RootState) => state.CSVMapper.edges);
    const accountId = useSelector((state: RootState) => state.CSVUploader.accountId);
    const dispatch = useAppDispatch();
    const [uploadedFilename, setUploadedFilename] = React.useState("");
    const [cannotUpload, setCannotUpload] = React.useState(false);

    const onUploadClick = () => {
        if (accountId === " " || accountId === "") { // did not choose account
            setCannotUpload(true);
        } else {
            dispatch(setHead(createNodeHead()));
            dispatch(mapData(selectedEdges));
            dispatch(resetCSVMapperState());
            props.setVisibility(false);
            setUploadedFilename("CSV");
        }
    }

    const closeMappingDialog = () => {
        dispatch(resetCSVUploaderState());
        dispatch(resetCSVMapperState());
        props.setVisibility(false);
        setUploadedFilename("CSV");
    }

    function onResetEdges() {
        dispatch(resetEdges());
    }

    return (
        <Dialog
            maxWidth="md"
            fullWidth={true}
            open={props.visible}
            onClose={() => props.setVisibility(false)}
            PaperComponent={PaperComponentFinanceo}
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
                            <Tooltip className="pointer" placement="bottom"
                                     title="Source-nodes represent column-names of incoming CSV data.">
                                <b> source-nodes </b>
                            </Tooltip>
                            to
                            <Tooltip className="pointer" placement="bottom"
                                     title="Target-nodes represent the columns of the table to be completed.">
                                <b> target-nodes </b>
                            </Tooltip>
                            to provide a correct datatransfer.
                        </DialogContentText>
                    </Grid>
                    <Grid item>
                        <Button size="small" variant="outlined" onClick={onResetEdges}>Reset edges</Button>
                    </Grid>
                </Grid>

                <div
                    style={{height: "50vh", border: "solid 1px lightgrey", borderRadius: "4px", marginTop: "5px"}}>
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
                    active: cannotUpload,
                    message: "Please select an account."
                }}
                style={{marginLeft: "25px", marginRight: "25px"}}/>
            <DialogActions>
                <Button onClick={() => closeMappingDialog()}>Cancel</Button>
                <Button onClick={() => onUploadClick()} autoFocus>Upload</Button>
            </DialogActions>
        </Dialog>
    )
}
