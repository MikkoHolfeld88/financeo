import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {PaperComponentFinanceo} from "../../utils";
import * as COLORS from "../../../constants/colors";
import Typography from "@mui/material/Typography";
import React from "react";

interface IAccountDeletionDialogProps {
    deleteDialogOpen: boolean;
    setDeleteDialogOpen: (value: boolean) => void;
    type: string;
    bank: string;
    onDeleteAccount: () => void;
}

export const AccountDeletionDialog = (props: IAccountDeletionDialogProps) => {
    return (
        <Dialog
            open={props.deleteDialogOpen}
            onClose={() => props.setDeleteDialogOpen(false)}
            PaperComponent={PaperComponentFinanceo}
            aria-labelledby="Delete Account / Depot">
            <DialogTitle id="Delete Account" style={{color: COLORS.SCHEME.warn}}>
                {"Delete " + props.type}
            </DialogTitle>
            <DialogContent>
                <Typography>
                    {"Really delete " + props.type + " '" + props.bank + "'?"}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={() => props.setDeleteDialogOpen(false)}>
                    No
                </Button>
                <Button
                    style={{color: COLORS.SCHEME.warn}}
                    onClick={props.onDeleteAccount}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}
