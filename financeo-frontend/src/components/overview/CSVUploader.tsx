import React, {useEffect} from 'react';
import {useCSVReader,} from 'react-papaparse';
import {Button, CircularProgress} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {CSVData} from "../../pages/overviewPage";

export default function CSVUploader() {
    const { CSVReader } = useCSVReader();
    const [loadCSV, setLoadCSV] = React.useState(false);
    const [newCSVData, setNewCSVData] = React.useState<CSVData>({} as CSVData)

    useEffect(() => {
        console.log(newCSVData);
        if (loadCSV) {
            setLoadCSV(false);
        }
    }, [newCSVData])

    return(
        <>
            {
                !loadCSV ?
                <CSVReader onClick={() => setLoadCSV(true)} onUploadAccepted={(results: any) => setNewCSVData(results)}>
                    {({getRootProps, acceptedFile}: any) => (
                        <Button
                            {...getRootProps()}
                            sx={{
                                height: "56px",
                                fontSize: "10px",
                            }}
                            variant="outlined"
                            startIcon={<FileUploadIcon />}>

                            {
                                acceptedFile ?
                                    acceptedFile.name.substring(0,4) + "(...).csv" :
                                    "CSV"
                            }
                        </Button>
                    )}
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