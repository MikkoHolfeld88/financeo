import {Option, SelectFinanceo} from "../utils";
import {changeYear, RootState} from "../../store";
import {useSelector} from "react-redux";
import moment from "moment";

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

const selectStyle = {
    margin: "0px 0px 0px 0px",
}

export default function YearPicker() {
    const year = useSelector((state: RootState) => state.yearPicker.value);

    return (
        <SelectFinanceo
            aria-label="year"
            label="Year"
            options={createYearOptions(calculateYears())}
            setState={changeYear}
            state={year}
            style={selectStyle}/>
    );
}
