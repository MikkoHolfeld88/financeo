import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link, useNavigate} from "react-router-dom";
import {auth, sendPasswordReset} from "../../services/firebaseService";
import "./reset.css";
import {Paper, Stack, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";

export function PasswordForgetPage() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/overview");
    }, [user, loading]);

    return (
        <div className="reset">
            <div className="reset__container">
                <Paper elevation={6}>
                    <Stack sx={{margin: "30px"}} spacing={2}>
                        <Typography variant="h4" gutterBottom component="div">
                            Forgot Password
                        </Typography>
                        <TextField
                            value={email}
                            id="standard-basic"
                            label="E-Mail"
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"/>
                        <Button
                            size="large"
                            onClick={() => sendPasswordReset(email)}
                            variant="contained">
                            Send password reset email
                        </Button>
                        <div>
                            Don't have an account? <Link to="/signup">Register</Link> now.
                        </div>
                    </Stack>
                </Paper>
            </div>
        </div>
    );
}

export default PasswordForgetPage;