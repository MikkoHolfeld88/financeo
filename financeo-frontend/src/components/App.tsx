import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from "./navigation";
import * as ROUTES from '../constants/routes'

import AccountingPage from "../pages/accountingPage";
import AccountPage from "../pages/accountPage";
import AdminPage from "../pages/adminPage";
import EvaluationPage from "../pages/evaluationPage";
import HomePage from "../pages/homePage";
import LandingPage from "../pages/landingPage";
import OverviewPage from "../pages/overviewPage";
import PasswordForgetPage from "../pages/passwordForgetPage";
import SignInPage from "../pages/signInPage";
import SignUpPage from "../pages/signUpPage";
import ErrorPage from "../pages/errorPage";

function App() {
  return (
    <Router>
        <Navigation />

        <hr/>

        <Routes>
            <Route path={ROUTES.LANDING} element={<LandingPage/>}/>
            <Route path={ROUTES.SIGN_UP} element={<SignUpPage/>}/>
            <Route path={ROUTES.SIGN_IN} element={<SignInPage/>}/>
            <Route path={ROUTES.PASSWORD_FORGET} element={<PasswordForgetPage/>}/>
            <Route path={ROUTES.ACCOUNT} element={<AccountPage/>}/>
            <Route path={ROUTES.ADMIN} element={<AdminPage/>}/>
            <Route path={ROUTES.HOME} element={<HomePage/>}/>
            <Route path={ROUTES.OVERVIEW} element={<OverviewPage/>}/>
            <Route path={ROUTES.ACCOUNTING} element={<AccountingPage/>}/>
            <Route path={ROUTES.EVALUATION} element={<EvaluationPage/>}/>
            <Route path={ROUTES.ERROR} element={<ErrorPage />}/>
        </Routes>
    </Router>
  );
};

export default App;
