import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {auth, logInWithEmailAndPassword, signInWithGoogle} from "../../services/firebaseService";
import {useAuthState} from "react-firebase-hooks/auth";
import "./login.css";
import {Paper, Stack, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import * as ROUTES from '../../constants/routes';

export function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/overview");
    }, [user, loading]);

    return (
        <div className="login">
            <div className="login__container">
                <Paper elevation={6}>
                    <Stack sx={{margin: "30px"}} spacing={2}>
                        <Typography variant="h4" gutterBottom component="div">
                            Login
                        </Typography>
                        <TextField
                            placeholder="E-mail"
                            value={email}
                            id="standard-basic"
                            label="E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"/>
                        <TextField
                            placeholder="Password"
                            value={password}
                            id="standard-basic"
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"/>
                        <Button
                            size="large"
                            onClick={() => logInWithEmailAndPassword(email, password)}
                            variant="contained">
                            Login
                        </Button>
                        <Button
                            size="large"
                            onClick={signInWithGoogle}
                            variant="contained">
                            Login with Google
                        </Button>
                        <div>
                            <Link to="/pw-forget">Forgot Password</Link>
                        </div>
                        <div>
                            Don't have an account? <Link to={ROUTES.SIGN_UP}>Register</Link> now.
                        </div>
                    </Stack>
                </Paper>
            </div>
        </div>
    );
}

export default SignInPage;