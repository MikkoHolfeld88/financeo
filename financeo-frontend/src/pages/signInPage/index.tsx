import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {auth, logInWithEmailAndPassword, signInWithGoogle} from "../../services/firebaseService/firebaseService";
import {useAuthState} from "react-firebase-hooks/auth";
import "./login.css";
import {Paper, Stack, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import * as ROUTES from '../../constants/routes';
import {addAccounts, setStatus, setUid} from "../../store";
import {RootState, useAppDispatch} from "../../store/store";
import getData from "../../services/databaseService/databaseService";
import {useSelector} from "react-redux";

export function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    let uid = user?.uid ? user?.uid : 'none';
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    let accountsStatus = useSelector((state: RootState) => state.accounts.status);

    function loadData(){
        loadAccountData();
    }

    function loadAccountData(){
        if(accountsStatus === 'idle'){
            getData('accountsAndDepots', uid)
                .then((documentData) => {
                    dispatch(addAccounts(documentData?.accounts));
                })
                .catch((error: any) => {
                    process.env.REACT_APP_RUN_MODE === 'DEVELOP' && console.log(error);
                });
        }
    }

    useEffect(() => {
        if (loading) {
            dispatch(setStatus('pending'));
            return;
        }
        if (user) {
            dispatch(setUid(user?.uid ? user?.uid : 'none'));
            loadData();
            navigate("/overview");
        }
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
                            type="password"
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