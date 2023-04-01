import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {PaperComponentFinanceo} from "../../../utils";
import * as COLORS from "../../../../constants/colors";
import Button from "@mui/material/Button";
import React from "react";

export interface IDeletionDialogProps {
    deleteDialogOpen: boolean;
    setDeleteDialogOpen: (open: boolean) => void;
    onDeleteCategory: () => void;
    name: string;
}

export const DeletionDialog = (props: IDeletionDialogProps) => {
    return (
        <Dialog
            open={props.deleteDialogOpen}
            onClose={() => props.setDeleteDialogOpen(false)}
            PaperComponent={PaperComponentFinanceo}
            aria-labelledby="Delete Account / Depot">
            <DialogTitle id="Delete Account" style={{color: COLORS.SCHEME.warn}}>
                {"Delete Category"}
            </DialogTitle>
            <DialogContent>
                <Typography>
                    {"Really delete category: " + props.name + "?"}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={() => props.setDeleteDialogOpen(false)}
                >
                    No
                </Button>
                <Button
                    style={{color: COLORS.SCHEME.warn}}
                    onClick={props.onDeleteCategory}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}
