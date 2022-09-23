import React from "react";
import {Chip, Grid, Tooltip} from "@mui/material";
import TextEditFinanceo from "../../utils/TextEditFinanceo";
import {updateAccount} from "../../../store";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as COLORS from "../../../constants/colors";

interface IAccountDesktopProps {
    index: string | false,
    type: string,
    bank: string,
    iban: string,
    bic: string,
    owner: string,
    onSaveValues: {
        path: string,
        uid: string,
        updateValue: any
    },
    setDeleteDialogOpen: (value: boolean) => void,
    ibanValidation: {
        function: (value: string) => boolean,
        message: string
    },
    bicValidation: {
        function: (value: string) => boolean,
        message: string
    }
    getAccountStyle: () => string,
}

const AccountDesktop = (props: IAccountDesktopProps) => {
    const handleChipClick = () => {};

    const ibanDisplayFunction = (iban: string) => {
        return iban.replace(/[a-zA-Z0-9_]{4}(?=.)/g, '$& ')
    };

    return (
        <Grid
            container
            spacing={1}
            alignItems="center"
            justifyItems="center"
            className="gridMain">
            <Grid item md={1} lg={1} xl={1} style={{textAlign: "center"}}>
                <Chip
                    style={{marginBottom: "5px"}}
                    label={props.index}
                    variant="outlined"
                    onClick={handleChipClick}/>
            </Grid>
            <Grid item md={1} lg={1} xl={1}>
                <b>
                    <TextEditFinanceo
                        className={props.getAccountStyle()}
                        name="type"
                        state={props.type}
                        readonly={true}/>
                </b>

            </Grid>
            <Grid item md={2} lg={2} xl={2}>
                <TextEditFinanceo
                    className={props.getAccountStyle()}
                    name="bank"
                    state={props.bank}
                    setState={updateAccount}
                    referenceValue={props.index}
                    onSave={props.onSaveValues}
                />
            </Grid>
            <Grid item md={3} lg={3} xl={3}>
                <TextEditFinanceo
                    className={props.getAccountStyle()}
                    name="iban"
                    state={props.iban}
                    setState={updateAccount}
                    referenceValue={props.index}
                    validation={props.ibanValidation}
                    formatDisplayFunction={ibanDisplayFunction}
                    onSave={props.onSaveValues}
                />
            </Grid>
            <Grid item md={2} lg={2} xl={2}>
                <TextEditFinanceo
                    className={props.getAccountStyle()}
                    name="bic"
                    state={props.bic}
                    setState={updateAccount}
                    referenceValue={props.index}
                    validation={props.bicValidation}
                    onSave={props.onSaveValues}
                />
            </Grid>
            <Grid item md={2} lg={2} xl={2}>
                <TextEditFinanceo
                    className={props.getAccountStyle()}
                    name="owner"
                    state={props.owner}
                    setState={updateAccount}
                    referenceValue={props.index}
                    onSave={props.onSaveValues}
                />
            </Grid>
            <Tooltip placement="left" title={"Delete account No. '" + props.index + "'"}>
                <Grid item md={1} lg={1} xl={1} sx={{textAlign: "center"}}>
                    <IconButton onClick={() => props.setDeleteDialogOpen(true)} aria-label="open account view">
                        <DeleteForeverIcon sx={{color: COLORS.SCHEME.warn}}/>
                    </IconButton>
                </Grid>
            </Tooltip>
        </Grid>
    )
}

export type {IAccountDesktopProps}

export default AccountDesktop;
