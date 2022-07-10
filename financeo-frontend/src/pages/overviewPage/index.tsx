import React, {useEffect} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseService"
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
