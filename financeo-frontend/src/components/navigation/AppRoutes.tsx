import {Navigate, Route, RouteProps, Routes} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService";
import React from "react";
import * as ROUTES from "../../constants/routes";
import {Dashboard, LandingPage, PasswordForgetPage, SignInPage, SignOutPage, SignUpPage} from "../../pages";
import Profile from "../../pages/profile";

export interface PrivateRouteProps extends RouteProps {
    children: JSX.Element;
}

export const PrivateRoute = ({children}: PrivateRouteProps) => {
    const [user] = useAuthState(auth);
    return user ? children : <Navigate to={ROUTES.SIGN_IN}/>;
};

export const AppRoutes: (props: RouteProps) => JSX.Element = (props: RouteProps) => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<LandingPage />}/>

            <Route path={ROUTES.DASHBOARD} element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
            <Route path={ROUTES.PROFILE} element={<PrivateRoute><Profile /></PrivateRoute>}/>

            <Route path={ROUTES.SIGN_UP} element={<SignUpPage/>}/>
            <Route path={ROUTES.SIGN_IN} element={<SignInPage/>}/>
            <Route path={ROUTES.SIGN_OUT} element={<SignOutPage/>}/>
            <Route path={ROUTES.PASSWORD_FORGET} element={<PasswordForgetPage/>}/>
        </Routes>
    )
}

export default AppRoutes;
