import {SelectFinanceo} from "../utils";
import {calculateYears, createYearOptions} from "./SelectOptionCreation";
import {changeYear, RootState} from "../../store";
import {useSelector} from "react-redux";

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
