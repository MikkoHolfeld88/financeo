import React, {useEffect} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "firebase/compat";
import { auth } from "../../services/firebaseService"
import { Submenu } from '../../components/navigation'
import Container from "@mui/material/Container";


const OverviewPage = () => {
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) return;
    }, [loading])

    return (
        <Container maxWidth="xl">

            <h1> OverviewPage </h1>
        </Container>
    )
};

export default OverviewPage;
