import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link, useNavigate} from "react-router-dom";
import {auth, registerWithEmailAndPassword, signInWithGoogle,} from "../../services/firebaseService/firebaseService"

import "./register.css";
import {Paper, Stack, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import * as COLORS from "../../constants/colors";

export function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/overview");
    }, [user, loading]);

    return (
        <div className="register">
            <div className="register__container">
                <Paper elevation={6}>
                    <Stack sx={{margin: "30px"}} spacing={2}>
                        <Typography variant="h4" gutterBottom component="div">
                            Register
                        </Typography>
                        <TextField
                            value={name}
                            id="standard-basic"
                            label="Full Name"
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"/>
                        <TextField
                            value={email}
                            id="standard-basic"
                            label="E-Mail"
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"/>
                        <TextField
                            type="password"
                            value={password}
                            id="standard-basic"
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"/>
                        <Button
                            size="large"
                            onClick={register}
                            variant="contained">
                            Register
                        </Button>
                        <Button
                            size="large"
                            onClick={signInWithGoogle}
                            variant="contained">
                            Register with Google
                        </Button>
                        <div>
                            Already have an account? <Link to="/signin">Login</Link> now.
                        </div>
                    </Stack>
                </Paper>
            </div>
        </div>
    );
}

export default SignUpPage;
