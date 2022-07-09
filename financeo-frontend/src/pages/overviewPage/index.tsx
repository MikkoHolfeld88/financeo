import React, {useEffect} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "firebase/compat";
import { auth } from "../../services/firebaseService"



const OverviewPage = () => {
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) return;
    }, [loading])

    return (
        <h1> OverviewPage </h1>
    )
};

export default OverviewPage;
