import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {auth, logInWithEmailAndPassword, signInWithGoogle} from "../../services/firebaseService/firebaseService";
import "./login.css";
import {Paper, Stack, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import * as ROUTES from '../../constants/routes';
import StateLoader from "../../store/StateLoader";
import {useAuthState} from "react-firebase-hooks/auth";

export function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            navigate("/overview");
        }
    }, [user]);

    return (
        <div className="login">
            <div className="login__container">
                <Paper elevation={6}>
                    <Stack sx={{margin: "30px"}} spacing={2}>
                        <Typography variant="h4" gutterBottom component="div">
                            Login
                        </Typography>
                        <TextField
                            InputLabelProps={{shrink: true}}
                            placeholder="E-mail"
                            value={email}
                            id="login_e_mail"
                            label="E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"/>
                        <TextField
                            InputLabelProps={{shrink: true}}
                            placeholder="Password"
                            type="password"
                            value={password}
                            id="login_password"
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

            <StateLoader/>

        </div>
    );
}

export default SignInPage;
