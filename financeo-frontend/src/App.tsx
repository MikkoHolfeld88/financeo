import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Navigation from "./components/navigation";
import AppRoutes from "./components/navigation/AppRoutes";

function App() {
    return (
        <Router>
            <Navigation/>
            <AppRoutes/>
        </Router>
    );
}

export default App;
