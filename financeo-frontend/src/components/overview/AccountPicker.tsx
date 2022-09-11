import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, useMediaQuery} from "@mui/material";
import {changePickedAccounts, RootState, useAppDispatch} from "../../store";
import {createAccountOptions} from "./SelectOptionCreation";
import React from "react";
import {useSelector} from "react-redux";
import theme from "../../theme";

export default function AccountPicker() {
    const dispatch = useAppDispatch();
    const mdScreenSize = useMediaQuery(theme.breakpoints.up('md'));
    const pickedAccounts: string | string[] = useSelector((state: RootState) => state.accountPicker.value);
    const accounts = useSelector((state: RootState) => state.accounts.data);

    const formControlStyle = {width: mdScreenSize ? "200px" : "170px"};

    return (
        <FormControl sx={formControlStyle}>
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
    )
}
