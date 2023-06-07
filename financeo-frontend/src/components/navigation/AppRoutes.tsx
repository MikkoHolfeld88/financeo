import {Navigate, Route, RouteProps, Routes} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../services/firebaseService/firebaseService";
import React from "react";
import * as ROUTES from "../../constants/routes";
import {
    AccountingPage,
    AccountPage,
    AnalysingPage,
    ErrorPage,
    HomePage,
    InvestingPage,
    OverviewPage,
    PasswordForgetPage,
    ProfilePage,
    SettingsPage,
    SignInPage,
    SignOutPage,
    SignUpPage
} from "../../pages";

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
            <Route path={ROUTES.HOME} element={<PrivateRoute><HomePage/></PrivateRoute>}/>
            <Route path={ROUTES.SIGN_UP} element={<SignUpPage/>}/>
            <Route path={ROUTES.SIGN_IN} element={<SignInPage/>}/>
            <Route path={ROUTES.SIGN_OUT} element={<SignOutPage/>}/>
            <Route path={ROUTES.PASSWORD_FORGET} element={<PasswordForgetPage/>}/>
            <Route path={ROUTES.ERROR} element={<ErrorPage/>}/>
            <Route path={ROUTES.ACCOUNT} element={<PrivateRoute><AccountPage/></PrivateRoute>}/>
            <Route path={ROUTES.PROFILE} element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
            <Route path={ROUTES.SETTINGS} element={<PrivateRoute><SettingsPage/></PrivateRoute>}/>
            <Route path={ROUTES.OVERVIEW} element={<PrivateRoute><OverviewPage/></PrivateRoute>}/>
            <Route path={ROUTES.ACCOUNTING} element={<PrivateRoute><AccountingPage/></PrivateRoute>}/>
            <Route path={ROUTES.INVESTING} element={<PrivateRoute><InvestingPage/></PrivateRoute>}/>
            <Route path={ROUTES.ANALYSING} element={<PrivateRoute><AnalysingPage/></PrivateRoute>}/>
        </Routes>
    )
}

export default AppRoutes;
