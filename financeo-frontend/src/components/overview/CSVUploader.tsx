import React, {useEffect} from 'react';
import {useCSVReader,} from 'react-papaparse';
import {Button, CircularProgress} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {addCSVData, ICSVUploaderProps, useAppDispatch, setCSVUploadError, RootState} from "../../store";
import moment from "moment/moment";
import {addAllData, addData} from "../../services/databaseService/databaseService";
import {useSelector} from "react-redux";

interface ICSVUploaderComponentProps {
    setCsvUploaded?: any;
    filename?: string;
    setFilename: any;
}

export default function CSVUploader(props: ICSVUploaderComponentProps) {
    const { CSVReader } = useCSVReader();
    const [loadCSV, setLoadCSV] = React.useState(false);
    const [newCSVData, setNewCSVData] = React.useState<ICSVUploaderProps>({} as ICSVUploaderProps)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(newCSVData && newCSVData?.data?.length > 0){
            props.setCsvUploaded(true);
            dispatch(addCSVData(newCSVData?.data));
        }
        if(newCSVData?.errors?.length > 0 || newCSVData?.meta?.length > 0){
            console.log("Errors or meta found during CSV upload!");
            dispatch(setCSVUploadError(newCSVData));
        }
        if (loadCSV) {
            setLoadCSV(false);
        }
    }, [newCSVData])

    const onUploadAccepted = (results: any, file: any) => {
        setNewCSVData(results);
        props?.setFilename(file.name)
    }

    return(
        <>
            {
                !loadCSV
                    ?
                        <CSVReader
                            onClick={() => setLoadCSV(true)}
                            onUploadAccepted={(results: any, file: any) => onUploadAccepted(results, file)}>
                            {
                                ({getRootProps, acceptedFile}: any) => (
                                    <Button
                                        {...getRootProps()}
                                        sx={{
                                            height: "56px",
                                            fontSize: "10px",
                                        }}
                                        variant="outlined"
                                        startIcon={<FileUploadIcon />}>
                                        {
                                            acceptedFile
                                                ? props.filename
                                                : "CSV"
                                        }
                                    </Button>
                                )
                            }
                        </CSVReader>
                    :
                        <Button // shows loading state
                            sx={{
                                height: "56px",
                                fontSize: "10px",
                            }}
                            variant="outlined"
                            startIcon={<CircularProgress size="1em"/>}>
                            CSV
                        </Button>
            }
        </>
    );
}