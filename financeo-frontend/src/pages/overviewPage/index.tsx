import React from 'react';
import "./style.scss"
import {SelectHeader} from "../../components/overview/SelectHeader";

const OverviewPage = () => {
    return (
        <React.Fragment>
            <SelectHeader csvUploaderInvisible={true}/>
        </React.Fragment>
    )
};

export default OverviewPage;
