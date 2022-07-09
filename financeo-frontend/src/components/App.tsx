import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from "./navigation";
import * as ROUTES from '../constants/routes'
import AppRoutes from "./navigation/AppRoutes";

function App() {
  return (
    <Router>
        <Navigation />
        <hr/>
        <AppRoutes />
    </Router>
  );
};

export default App;
