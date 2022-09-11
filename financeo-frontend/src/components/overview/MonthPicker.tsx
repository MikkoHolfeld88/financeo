import {SelectFinanceo} from "../utils";
import {months} from "./SelectOptionCreation";
import {changeMonth, RootState} from "../../store";
import {useSelector} from "react-redux";
import React from "react";

const selectStyle = {
    margin: "0px 0px 0px 0px",
}

export default function MonthPicker() {
    const month = useSelector((state: RootState) => state.monthPicker.value);

    return (
        <SelectFinanceo
            aria-label="month"
            label="Month"
            options={months}
            setState={changeMonth}
            state={month}
            style={selectStyle}/>
    );
}
