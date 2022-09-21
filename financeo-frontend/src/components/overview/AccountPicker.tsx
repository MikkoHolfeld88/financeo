import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, useMediaQuery} from "@mui/material";
import {changePickedAccounts, IAccountProps, RootState, useAppDispatch} from "../../store";
import React from "react";
import {useSelector} from "react-redux";
import theme from "../../theme";

export type AccountOption = {
    value: any | undefined,
    label: string | any,
    id: string | any,
}

export const createAccountOptions = (accounts: IAccountProps[]): AccountOption[] => {
    return accounts.map((account, index) => {
        return {
            value: account?.bank + " (" + (index + 1) + ")",
            label: account?.bank,
            id: account?.id
        }
    });
}

export default function AccountPicker() {
    const dispatch = useAppDispatch();
    const mdScreenSize = useMediaQuery(theme.breakpoints.up('md'));
    const pickedAccounts: string | string[] = useSelector((state: RootState) => state.accountPicker.pickedAccounts);
    const accounts = useSelector((state: RootState) => state.accounts.data);

    const formControlStyle = {width: mdScreenSize ? "200px" : "170px"};

    function onChange(event: any){
        const pickedAccounts: string[] = event.target.value;
        let pickedAccountIds: string[] = [];

        accounts.forEach((account) => {
            pickedAccounts.forEach((pickedAccount) => {
                if (pickedAccount.includes(account.id)) {
                    pickedAccountIds.push(account.id);
                }
            })
        })

        dispatch(changePickedAccounts({
            pickedAccounts: event.target.value,
            ids: pickedAccountIds
        }));
    }

    return (
        <FormControl sx={formControlStyle}>
            <InputLabel id="Accounts and Depots Picker Input Label">Accounts/Depots</InputLabel>
            <Select
                aria-label="Accounts and Depots Picker"
                labelId="Accounts and Depots Picker LabelID"
                id="Accounts and Depots Picker ID"
                multiple
                value={pickedAccounts ? pickedAccounts : []}
                onChange={(event) => onChange(event)}
                input={<OutlinedInput label="Accounts/Depots"/>}>
                {
                    accounts && createAccountOptions(accounts).map((accountOption, index) => (
                        <MenuItem
                            key={accountOption.id}
                            value={accountOption.value + " [ID: " + accountOption.id + "]"}>
                            {accountOption.label + " (" + (index + 1) + ")"}
                        </MenuItem>))
                }
            </Select>
        </FormControl>
    )
}
