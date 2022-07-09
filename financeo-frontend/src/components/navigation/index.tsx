import React, {useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {logout} from "../../services/firebaseService";

import * as ROUTES from '../../constants/routes';

const Navigation = () => {
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === "/signout"){
            logout();
        }
    }, [location])

    return (
        <div>
            <ul>
                <li><Link to={ROUTES.ACCOUNT}>Account</Link></li>
                <li><Link to={ROUTES.SIGN_IN}>Sign In</Link></li>
                <li><Link to={ROUTES.SIGN_UP}>Sign Up</Link></li>
                <li><Link to={ROUTES.LANDING}>Landing</Link></li>
                <li><Link to={ROUTES.HOME}>Home</Link></li>
                <li><Link to={ROUTES.ADMIN}>Admin</Link></li>
                <li><Link to={ROUTES.OVERVIEW}>Overview</Link></li>
                <li><Link to={ROUTES.ACCOUNTING}>Accounting</Link></li>
                <li><Link to={ROUTES.EVALUATION}>Evaluation</Link></li>
                <li><Link to={ROUTES.SIGN_OUT}>Logout</Link></li>
            </ul>
        </div>
    )
};

export default Navigation;
