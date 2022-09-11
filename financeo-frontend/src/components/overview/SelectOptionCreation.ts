import {Option} from "../utils";
import moment from "moment";
import {IAccountProps} from "../../store";

export type AccountOption = {
    value: any | undefined,
    label: string | any,
    id: string | any,
}

export type BasicAccountOption = {
    value: string,
    label: string | any,
}

export const months: Option[] = [
    {value: 1, label: "January"},
    {value: 2, label: "February"},
    {value: 3, label: "March"},
    {value: 4, label: "April"},
    {value: 5, label: "May"},
    {value: 6, label: "June"},
    {value: 7, label: "July"},
    {value: 8, label: "August"},
    {value: 9, label: "September"},
    {value: 10, label: "October"},
    {value: 11, label: "November"},
    {value: 12, label: "December"},
];

export const calculateYears = (pastYears: number = 10): number[] => {
    const latestYear = moment().year();
    const firstYear = moment().year() - pastYears;

    const range = (start: number, end: number): number[] => {
        for (var i = start, list = []; i <= end; list.push(i), i++) ;
        return list.reverse();
    };

    return range(firstYear, latestYear);
}

export const createYearOptions = (years: number[]): Option[] => {
    return years.map((year) => {
        return ({value: year, label: year.toString()})
    })
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

export const createBasicAccountOptions = (accounts: IAccountProps[]): BasicAccountOption[] => {
    return accounts.map((account, index) => {
        return {
            value: account.id,
            label: account?.bank
        }
    });
}
